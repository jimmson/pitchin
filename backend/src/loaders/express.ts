import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../config';
import routes from '../routes';
import rateLimit from 'express-rate-limit';
import getDuration from '../middleware/Timer';

export default ({ app }: { app: express.Application }) => {
  // Set up Express middlewares

  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  // Rate limiting
  const resetLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
  });

  app.use('/auth/reset', resetLimit);

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );

  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    // @ts-expect-error ts-migrate(7053) FIXME: Property 'status' does not exist on type 'Error'.
    err['status'] = 404;
    next(err);
  });

  // Enable response time logging
  app.use((req, res, next) => {
    const start = process.hrtime();
    res.on('finish', () => {
      const duration = getDuration(start);
      console.log(`[d] ${req.method} ${req.originalUrl} [FINISHED] ${duration.toLocaleString()} ms`);
    });
    res.on('close', () => {
      const duration = getDuration(start);
      console.log(`[d] ${req.method} ${req.originalUrl} [CLOSED] ${duration.toLocaleString()} ms`);
    });
    next();
  });

  /// error handlers
  app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    if (err) {
      res.status(400).send('Bad request');
    } else {
      next();
    }
  });

  // app.use((err, req, res, next) => {
  //   /**
  //    * Handle 401 thrown by express-jwt library
  //    */
  //   if (err.name === 'UnauthorizedError') {
  //     return res
  //       .status(err.status)
  //       .send({ message: err.message })
  //       .end();
  //   }
  //   return next(err);
  // });
  // app.use((err, req, res, next) => {
  //   res.status(err.status || 500);
  //   res.json({
  //     errors: {
  //       message: err.message,
  //     },
  //   });
  // });
};
