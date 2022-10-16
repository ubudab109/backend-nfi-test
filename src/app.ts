import express, {Request, Response} from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { Routes } from './routes';

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
  }

  /**
   * METHOD TO CONFIGURE THE SERVER
   * DEFAUL PORT IS 3030
   */
  public configuration = () => {
    this.app.set('port', process.env.PORT || 3030);
  }

  /** 
   * METHOD TO CONFIGURE THE ROUTES
   */
  public routes = async () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Backend Test");
    });
    Routes.forEach(route => {
      (this.app as any)[route.method](route.route, 
        ...route.validation,
        async (req: Request, res: Response, next: Function): Promise<void> => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(422).json({
              status: false,
              message: errors.array(),
              data: null,
            });
          } else {
            const result = await (new (route.controller as any))[route.action](req,res,next);
            res.json(result);
          }
        } catch (err) {
          next(err);
        }
      })
    });
  }

  /**
   * FOT STARTING THE SERVER
   */
  public start = () => {
    this.app.listen(this.app.get('port'),  () => {
      console.log(`Server is listening ${this.app.get('port')} port`);
    });
  }
}

