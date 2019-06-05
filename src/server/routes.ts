/*TODO:
Add middleware for login, check login if /hub
Add security for promise rejection with try/catch
Add multi-user support maybe
Add desktop-server validation
*/

import ComputerController from '../controllers/ComputerController';
import UserController from '../controllers/UserController';
import ApiController from '../controllers/ApiController';

let routes = (app) => {
    let computerController : ComputerController = new ComputerController();
    let userController : UserController = new UserController();
    let apiController : ApiController = new ApiController(userController.passkey);

    app.get('/', userController.getLogin);
    app.get('/hub/logout', userController.getLogout);
    app.get('/hub', computerController.getData);

    app.post('/', userController.postLogin);
    app.post('/hub/computers/update', computerController.patch);
    app.post('/api/login', apiController.postLogin);
    app.post('/api/computers/register', apiController.postRegisterComputer);
}
export default routes;
