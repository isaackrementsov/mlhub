/*TODO:
Add web security and validation
*/

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as redis from 'redis';
import * as session from 'express-session';

import ejs from 'ejs';

import randomGen from './util/randomGen';

import * as middleware from './util/middleware';

const RedisStore = require('connect-redis')(session);

const client = redis.createClient();
const app = express();

const SESSION_SECRET = randomGen();

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new RedisStore({
        client: client,
        host: 'localhost',
        port: 6379,
    })
}));
app.use(express.static(path.join(__dirname, "../public")));
app.use(middleware.auth);

export default app;
