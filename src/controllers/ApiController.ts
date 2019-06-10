import { Request, Response } from 'express';
import { Repository, Not, getRepository } from 'typeorm';

import Computer from '../entity/Computer';
import TrainingData from '../entity/TrainingData';
import Activation from '../entity/Activation';
import Config from '../entity/Config';

export default class ApiController {

    computerRepo : Repository<Computer>;
    trainingDataRepo : Repository<TrainingData>;
    activationRepo : Repository<Activation>;
    configRepo : Repository<Config>;
    passkey : string;

    //Except for the last two, all methods in ApiController are middleware checked, so authKey must be valid

    getInputs = async (req : Request, res : Response) => {
        let data : TrainingData[] = await this.trainingDataRepo.find({relations: ['inputActivations']});

        let inputs : number[][] = data.map(d => {
            return d.inputActivations.map(i => {
                return i.val;
            });
        });

        res.send(inputs);
    }

    getOutputs = async (req : Request, res : Response) => {
        let data : TrainingData[] = await this.trainingDataRepo.find({relations: ['outputActivations']});

        let outputs = data.map(d => {
            return d.outputActivations.map(o => {
                return o.val;
            });
        });

        res.send(outputs);
    }

    getMisc = async (req : Request, res : Response) => {
        let computer : Computer = await this.computerRepo.findOne({select: ['learningRate'], where: {'authKey': req.query.authKey}});
        let config : Config = await this.configRepo.findOne();
        res.send({
            learningRate: computer.learningRate,
            thresHold: config.thresHold,
            decayRate: config.decayRate,
            maxSteps: config.maxSteps,
            layers: config.layers
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

        this.passkey = userPasskey;
    }

}
