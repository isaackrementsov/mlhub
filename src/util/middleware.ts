import { Response, Request, NextFunction } from "express";

export default class Middleware {
    
    auth(req : Request, res : Response, next : NextFunction){
        let urlParts : string[] = req.url.split('/');
        let code: number = 0;
        if(urlParts.length > 1){
            if((urlParts[1] == 'hub' && req.session.loggedIn) || (urlParts[1] != 'hub' && !req.session.loggedIn)){
                code = 1;
            }else if(urlParts[1] != 'hub' && req.session.loggedIn){
                code = 2;
            }
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
        }
    }

}
