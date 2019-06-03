import { Response, Request } from 'express';
import { Repository, getRepository } from 'typeorm';
import Computer from '../entity/Computer';

export default class ComputerController {

    repo : Repository<Computer>;

    getData = async (req : Request, res : Response) => {
        let computers : Computer[] = await this.repo.find({'relations': ['data']});
        res.render("hub", {session: req.session, computers: computers});
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

    constructor(){
        this.repo = getRepository(Computer);
    }

}
