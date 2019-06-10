/*TODO:
Don't select all minima
*/
import { Response, Request } from 'express';
import { Repository, getRepository } from 'typeorm';
import * as moment from 'moment';


import RelativeMinimum from '../entity/RelativeMinimum';
import Computer from '../entity/Computer';
import DataPoint from '../entity/DataPoint';

export default class ComputerController {

    repo : Repository<Computer>;
    minRepo : Repository<RelativeMinimum>;
    dateRepo : Repository<DataPoint>;

    getData = async (req : Request, res : Response) => {
        let computers : Computer[] = await this.repo.find({'relations': ['data']});
        let relativeMinima : RelativeMinimum[] = await this.minRepo.find();
        res.render("hub", {session: req.session, computers: computers, minima: relativeMinima.sort((a, b) => a.value - b.value)});
    }


    patch = async (req : Request, res : Response) => {
        for(let key of Object.keys(req.body)){
            let parts : string[] = key.split('|');
            if(parts[0] == 'comp'){
                await this.repo.createQueryBuilder()
                    .update()
                        .set({'learningRate': parseFloat(req.body[key])/10})
                            .where({'id': parts[1]})
                                .execute();
            }
        }
        res.redirect('/hub');
    }

    getPerformance = async (req : Request, res : Response) => {
        let computers : Computer[] = await this.repo.find({'relations' : ['data']});
        let relativeMinima : RelativeMinimum[] = await this.minRepo.find();
        let datePoints : DataPoint[] = await this.dateRepo.find();
        datePoints.sort((a, b) => {
            return a.time.valueOf() - b.time.valueOf();
        })
        console.log(datePoints[0].time.valueOf());
        res.render("performance", {
            session: req.session, 
            computers: computers, 
            minima: relativeMinima.sort((a, b) => a.value - b.value), 
            date: moment(datePoints[0].time.valueOf()).fromNow()
        });
        
    }

    //wsStopComputers

    constructor(){
        this.repo = getRepository(Computer);
        this.minRepo = getRepository(RelativeMinimum);
        this.dateRepo = getRepository(DataPoint);
    }

}
