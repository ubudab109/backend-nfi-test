import { param } from "express-validator";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { UserController } from "./controllers/user.controller";

export const Routes = [
  {
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "index",
    validation: [],
  },
  {
    method: "post",
    route: "/api/users",
    controller: UserController,
    action: "create",
    validation: [
      body('name').isString().withMessage("Name not valid"),
      body('email').isEmail().withMessage("Email not valid")
    ]
  },
  {
    method: "post",
    route: "/api/users/deposit/:id",
    controller: UserController,
    action: "deposit",
    validation: [
      param('id').isInt(),
      body('amount').isFloat({
        min: 1,
      }).withMessage("Amount deposit can't be mines and must be greater than 1"),
    ]
  },
  {
    method: "post",
    route: "/api/users/withdraw/:id",
    controller: UserController,
    action: "withdraw",
    validation: [
      param('id').isInt(),
      body('amount').isFloat({
        min: 1,
      }).withMessage("Amount withdraw can't be mines and must be greater than 1"),
    ]
  },
];