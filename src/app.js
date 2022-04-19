import path from 'path';
import logger from 'morgan';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import httpErrors from 'http-errors';
import Config from './configs/config';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index';

const app = express();
global.APP_HOST = process.env.APP_HOST;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': ["'unsafe-inline'"],
        'script-src': ["'unsafe-inline'", "'self'", `http://ajax.googleapis.com/`],
        'connect-src': ["'unsafe-inline'", `https://*.exacttargetapis.com`, `${APP_HOST}`],
        'img-src': ["'unsafe-inline'", `${APP_HOST}`],
        'style-src': ["'unsafe-inline'", "'self'", `https://stackpath.bootstrapcdn.com/`],
        'font-src': ["'unsafe-inline'","'self'", `${APP_HOST}`],
        'frame-ancestors': ["'self'", `https://*.exacttarget.com`, `https://*.marketingcloudapps.com`],
      },
    },
  }),
);


// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json({
  limit: '50mb',
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.raw({
  limit: '50mb',
  type: 'application/jwt',
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);

app.use(function (req, res, next) {
  res.locals.baseurl = process.env.APP_HOST;
  next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.log("err.message---", err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Custom Activity'
  });
});

var server = app.listen(Config.port, () => console.log(`Listening on port ${Config.port}`));
exports.server = server;

module.exports = app;
