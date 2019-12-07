import express from 'express';
import {PORT, NODE_ENV,MONGO_URI,SESS_NAME, SESS_SECRET, SESS_LIFETIME } from '../config'
import {userRoutes} from './routes/index'
import session from "express-session";

import connectStore from "connect-mongo";
//To connect to Mongo DB
import mongoose from 'mongoose';

(async () => {
    try {
      await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
      console.log('MongoDB connected');


const app = express();
const MongoStore = connectStore(session);

//Disable powered by so that no one knows our stack
app.disable('x-powered-by');

//This is used to parse HTTP request
app.use(express.urlencoded({ extended : true}))
app.use(express.json());

//saveUninitialized: false; This complies with laws that require permission before setting a cookie.
//resave: false; This prevents unnecessary re-saves if the session wasn’t modified.

app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session',
      ttl: parseInt(SESS_LIFETIME) / 1000
    }),
    cookie: {
      sameSite: true,
      secure: NODE_ENV === 'production',
      maxAge: parseInt(SESS_LIFETIME)
    }
  }));

//Create a new Router
const apiRouter = express.Router();

//We are telling the app to use apiRouter for /api uri
app.use('/api',apiRouter);

//Whenever we are getting /user in the uri, we are using userRoutes function
apiRouter.use('/users',userRoutes);
apiRouter.use('/session', sessionRoutes);



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

} catch (err) {
    console.log(err)
  }
})();

