import { Request, Response } from 'express';
import { Repository, getRepository } from 'typeorm';

import Computer from '../entity/Computer';

export default class ApiController {

    computerRepo : Repository<Computer>;
    passkey : string;

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
        this.passkey = userPasskey;
    }

}
