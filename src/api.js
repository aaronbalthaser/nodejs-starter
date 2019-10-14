'use strict';

import '@babel/polyfill';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

// IOC Container ===================
// =================================
import { services } from './ioc';

// API Config ======================
// =================================
const config = services.configManager.config;
const PORT = config.PORT;

// Database ========================
// =================================
const database = services.database.db;

// Auth Routes =====================
// =================================
import authGenRegisterRouter from './routes/auth/register.route';
import authGenLoginRouter from './routes/auth/login.route';

// API Routes ======================
// =================================
import userGenRouter from 'routes/user.routes';

// Express Application
const app = express();
const server = http.createServer(app);

// Middleware ======================
// =================================
/**
 * Helmet: HTTP Headers Security
 * https://www.npmjs.com/package/helmet
 */
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sequelize CB ====================
// =================================
database.sequelize.sync() // { force: true }
  .then(() => {
    app.use(services.passport.instance.initialize(null));

    // Routers
    const auth = express.Router();
    const api = express.Router();

    // Routes Invocation
    /* Authentication */
    const authRegisterRouter = authGenRegisterRouter(express, services);
    const authLoginRouter = authGenLoginRouter(express, services);

    /* API */
    const userRouter = userGenRouter(express, services);

    // Set Routes
    /* Authentication */
    auth.use('/register', authRegisterRouter);
    auth.use('/login', authLoginRouter);

    /* API */
    api.use('/user', userRouter);

    /* Authentication Routers */
    app.use('/auth', auth);

    /* Private API Routers */
    app.use('/api', [services.passport.instance.authenticate('jwt-bearer', {
      session: false,
      failWithError: true
    }, null), (err, req, res, next) => {

      if (err) {
        const error = {
          error: err.name,
          message: err.message
        };

        const statusCode = err.status || 500;

        return res.status(statusCode).json(error);
      }

      return next();
    }], api);
  });

// Run Server ======================
// =================================
server.listen(PORT, () => {
  console.log('Environment:', config.NODE_ENV);
  console.log('Listening on port: ' + server.address().port);
});
