import { Response, Request } from 'express';

const PASSKEY = 'password123';

export let getHome = (req : Request, res : Response) => {
    res.render("home");
}

export let login = (req : Request, res : Response) => {
    if(req.body.key == PASSKEY){
        req.session.loggedIn = true;
        res.redirect('/hub');
    }else{
        res.redirect('/');
    }
}
export let logout = (req: Request, res : Response) => {
    req.session.loggedIn = false;
    res.redirect('/');
}
