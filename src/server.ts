import app from './app';
import routes from './server/routes';

const server = app.listen(app.get('port'), () => {
    console.log('App is running on localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('Press CTRL + C to stop');
});
routes(app);
