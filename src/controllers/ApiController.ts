import { Request, Response } from 'express';
import { Repository, Not, getRepository } from 'typeorm';
import * as WebSocket from 'ws';

import Computer from '../entity/Computer';
import TrainingData from '../entity/TrainingData';
import Activation from '../entity/Activation';
import Config from '../entity/Config';
import RelativeMinimum from '../entity/RelativeMinimum';
import Weight from '../entity/Weight';

export default class ApiController {

    computerRepo : Repository<Computer>;
    trainingDataRepo : Repository<TrainingData>;
    activationRepo : Repository<Activation>;
    weightRepo : Repository<Weight>;
    configRepo : Repository<Config>;
    minimaRepo : Repository<RelativeMinimum>;
    passkey : string;

    private mapData(td : TrainingData[], input : boolean) : number[][] {
        return td.map((d : TrainingData) => {
            let arr : Activation[] = input ? d.inputActivations : d.outputActivations;
            return arr.filter((i : Activation) => input ? i.def == '' : i.def != '')
                .map((i : Activation) => i.val);
        });
    }

    //Except for the last two, all methods in ApiController are middleware checked, so authKey must be valid
    wsOpen = (ws : WebSocket, req : Request) => {
        ws.on('message', (ws : WebSocket, req : Request) => {
            
        });
    }

    wsRelativeMinimum = (ws : WebSocket, req : Request) => {
        ws.on('message', async data => {
            let obj = JSON.parse(data);

            obj.weights.map(l => l.map(j => j.map(k => {
                this.weightRepo.save(new Weight(j, l, obj.weights[l][j][k].val, k));
            })));

            obj.biases.map(l => l.map(j => {
                this.weightRepo.save(new Weight(j, l, obj.biases[l][j].val));
            }));

            let refComp : Computer = await this.computerRepo.findOne({'authKey': data.authKey});
            let min : RelativeMinimum = new RelativeMinimum(
                refComp,
                data.session,
                new Date(),
                data.cost
            );

            this.minimaRepo.save(min);

            ws.send(JSON.stringify(min));
        });
    }

    getInputs = async (req : Request, res : Response) => {
        let data : TrainingData[] = await this.trainingDataRepo.find({relations: ['inputActivations']});

        let inputs : number[][] = this.mapData(data, true);

        res.send(inputs);
    }

    getOutputs = async (req : Request, res : Response) => {
        let data : TrainingData[] = await this.trainingDataRepo.find({relations: ['outputActivations']});

        let outputs : number[][] = this.mapData(data, false)

        res.send(outputs);
    }

    getMisc = async (req : Request, res : Response) => {
        let computer : Computer = await this.computerRepo.findOne({select: ['learningRate'], where: {'authKey': req.query.authKey}});
        let config : Config = await this.configRepo.findOne();
        let minimum = await this.minimaRepo.createQueryBuilder('rel')
            .select('MIN(rel.value)', 'min').getRawOne();

        res.send({
            learningRate: computer.learningRate,
            thresHold: config.thresHold,
            decayRate: config.decayRate,
            maxSteps: config.maxSteps,
            layers: config.layers,
            minimum: minimum.min
        });
    }

    postLogin = (req : Request, res : Response) => {
        let login : boolean = false;
        if(req.query.password == this.passkey){
            login = true;
        }
        res.send({'login': login});
    }

    postRegisterComputer = async (req : Request, res : Response) => {
        let computer : Computer = new Computer(req.query.name, 1);
        if(req.query.password == this.passkey){
            this.computerRepo.save(computer).then(() => {
                res.send({authKey: computer.authKey, computer: computer});
            }).catch(e => {
                res.send({authKey: null});
            });
        }else{
            res.send({authKey: null});
        }
    }

    constructor(userPasskey : string){
        this.computerRepo = getRepository(Computer);
        this.trainingDataRepo = getRepository(TrainingData);
        this.activationRepo = getRepository(Activation);
        this.configRepo = getRepository(Config);
        this.minimaRepo = getRepository(RelativeMinimum);
        this.weightRepo = getRepository(Weight);

        this.passkey = userPasskey;
    }

}
