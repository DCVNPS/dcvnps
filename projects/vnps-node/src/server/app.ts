import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as fileUpload from 'express-fileupload';
import * as ExpresRequestId from 'express-request-id';
// import { Config } from './config';
import routeHandler from './routes';

export class App {
  public app;
  // private config = new Config();
  private expresRequestId = ExpresRequestId();
  constructor() {
    // console.log(this.config);
    this.configApp();
  }

  private configApp() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(fileUpload({
      limits: { fileSize: 2 * 1024 * 1024 },
      createParentPath: true,
      userTempFiles: true,
      tempFileDir: '/temp/'
    }));
    // config application static resource paths
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use('/galleries', express.static(path.join(__dirname, '../galleries')));
    this.app.use('/siteimages', express.static(path.join(__dirname, '../siteimages')));
    // inject a request id
    this.app.use(this.expresRequestId);

    // config api router. this will be update after implement routeHandler
    this.app.use('/api', routeHandler);
    // Configure router to let AngularJS handles other requests that are no api request.
    this.app.use('*', (req, res) => {
      // if a request url include 'api', no server route serving the request.
      // console.log(`${req.baseUrl}`);
      if (req.baseUrl.indexOf('api') > -1) {
        res.status(503).send(`request: ${req.originalUrl}. Service Unavailable.`);
      } else {
        res.sendFile(path.join(__dirname, 'public/index.html'));
      }
    });
  }
}
export default new App().app;
