import { Response, Request } from 'express';
import { Repository, getRepository } from 'typeorm';
import Computer from '../entity/Computer';

export default class ComputerController {

    repo : Repository<Computer>;

    getData = async (req : Request, res : Response) => {
        let computers : Computer[] = await this.repo.find();
        res.render("hub", {session: req.session, computers: computers});
    }

    constructor(){
        this.repo = getRepository(Computer);
    }

}
