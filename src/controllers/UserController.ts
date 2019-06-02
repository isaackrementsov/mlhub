import { Response, Request } from 'express';

import randomGen from '../util/randomGen';
import app from '../app';

export default class UserController {

    passkey : string;

    getLogin = (req : Request, res : Response) => {
        res.render("home");
    }

    login = (req : Request, res : Response) => {
        if(req.body.key == this.passkey){
            req.session.loggedIn = true;
            res.redirect('/hub');
        }else{
            res.redirect('/');
        }
    }

    logout = (req: Request, res : Response) => {
        req.session.loggedIn = false;
        res.redirect('/');
    }

    constructor(){
        if(app.get('env') == 'production'){
            this.passkey = randomGen();
        }else{
            this.passkey = 'password123';
        }
    }

}
