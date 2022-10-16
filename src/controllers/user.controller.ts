import {
  Router,
  Response,
  Request,
} from "express";
import { TransactionEntity } from "../database/entities/transaction.entities";
import { UserEntity } from "../database/entities/user.entities";
import { UserService } from "../services/user.services";

export class UserController {
  public router: Router;
  private services: UserService;


  constructor() {
    this.router = Router();
    this.routes();
    this.services = new UserService();
  }

  /**
   * This is a function that is called when a user makes a request to get all users.
   * @param req 
   * @param res 
   */
  public index = async (req: Request, res: Response) => {
    const data = await this.services.index();
    if (!data.status) {
      res.status(data.code).json({
        status: data.status,
        message: "Failed get data",
        data: data.data,
      });
    } else {
      res.status(200).json({
        status: data.status,
        message: "Data fetched successfully",
        data: data.data,
      });
    }
  }

  /**
   * Request for create user
   * @param req Request
   * @param res Response
   */
  public create = async (req: Request, res: Response) => {
    const request = req['body'] as UserEntity;
    const post = await this.services.create(request);
    if (!post.status) {
      res.status(500).json({
        status: false,
        message: "Failed to Create User",
        data: post.data
      });
    } else {
      res.status(200).json({
        status: true,
        message: "User Created Successfully",
        data: post.data
      });
    }
  }

  /**
   * This is a function that is called when a user makes a deposit request.
   * @param req 
   * @param res 
   */
  public deposit = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const request = req['body'] as TransactionEntity;
    const deposit = await this.services.deposit(request, parseInt(userId));

    if (!deposit.status) {
      res.status(deposit.code).send({
        status: deposit.status,
        message: "Failed to deposit",
        data: deposit.data,
      });
    } else {
      res.status(200).send({
        status: deposit.status,
        message: "Deposit Created Successfully",
        data: deposit.data,
      });
    }
  }

  /**
   * This is a function that is called when a user makes a withdraw request.
   * @param req 
   * @param res 
   */
  public withdraw = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const request = req['body'] as TransactionEntity;
    const withdraw = await this.services.withdraw(request, parseInt(userId));

    if (!withdraw.status) {
      res.status(withdraw.code).send({
        status: withdraw.status,
        message: "Failed to withdraw",
        data: withdraw.data,
      });
    } else {
      res.status(200).send({
        status: withdraw.status,
        message: "Withdraw Created Successfully",
        data: withdraw.data,
      });
    }
  }

  public routes = () => {
    this.router.get("/", this.index);
    this.router.post("/", this.create);
    this.router.post("/deposit/:id", this.deposit);
    this.router.post("/withdraw/:id", this.withdraw);
  }
}