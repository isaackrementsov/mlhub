import { createConnection } from 'typeorm';

import app from './app';
import routes from './server/routes';

createConnection().then(async connection => {
    await connection.synchronize();
    app.listen(app.get('port'), () => {
        console.log('App is running on localhost:%d in %s mode', app.get('port'), app.get('env'));
        console.log('Press CTRL + C to stop');
    });
    routes(app);
}).catch(e => console.log('Database Error: ', e));
