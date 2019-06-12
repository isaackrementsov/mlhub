import { Response, Request, NextFunction } from "express";
import { Repository, getRepository } from 'typeorm';

import Computer from '../entity/Computer';

export default class Middleware {

    computerRepo : Repository<Computer>;

    static instance : Middleware;

    auth(req : Request, res : Response, next : NextFunction){
        let urlParts : string[] = req.url.split('/');
        let code: number = 0;
        if(urlParts.length > 1){
            if((urlParts[1] == 'hub' && req.session.loggedIn) || (urlParts[1] != 'hub' && !req.session.loggedIn)){
                code = 1;
            }else if(urlParts[1] != 'hub' && req.session.loggedIn){
                code = 2;
            }
            let val : number = Middleware.instance.apiCheck(urlParts, req.query.authKey);
            if(val != -1) code = val;
        }else{
            code = 1;
        }
        switch(code){
            case 0:
                res.redirect('/');
                break;
            case 1:
                next();
                break;
            case 2:
                res.redirect('/hub');
                break;
            case 3:
                res.send({auth: false});
        }
    }

    apiCheck(parts : string[], authKey : string) : number {
        if(parts[1] == 'api' && !(parts[2] == 'login' || parts[3] == 'register')){
            if(this.computerRepo.find({select: ['authKey'], where: {'authKey': authKey}}))  return 1;
            return 3;
        }else return -1;
    }

    constructor(){
        this.computerRepo = getRepository(Computer);
        Middleware.instance = this;
    }

}
