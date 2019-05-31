import { Response, Request } from "express";

export let getDashboard = (req : Request, res : Response) => {
    res.render("hub", {session: req.session});
}
