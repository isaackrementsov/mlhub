/*TODO:
Add middleware for login, check login if /hub
*/

import * as hubController from '../controllers/hubController';
import * as landingController from '../controllers/landingController';

let routes = (app) => {
    app.get('/', landingController.getHome);
    app.get('/hub', hubController.getDashboard);

    app.post('/', landingController.login);
    app.post('/logout', landingController.logout);
}
export default routes;
