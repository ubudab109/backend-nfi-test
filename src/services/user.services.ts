import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { TransactionEntity } from "../database/entities/transaction.entities";
import { UserEntity } from "../database/entities/user.entities";
import { TransactionType } from "../utils/transaction-type.enum";

export class UserService {
  private userRepository: Repository<UserEntity>;
  private transactionRepository: Repository<TransactionEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
    this.transactionRepository = AppDataSource.getRepository(TransactionEntity);
  }

  /**
   * This is a function that is used to get all users.
   * @returns 
   */
  public index = async () => {
    try {
      const data = await this.userRepository.createQueryBuilder("users")
      .leftJoinAndSelect("users.transaction","transaction")
      .getMany();
      return {
        status: true,
        code: 200,
        data: data,
      }
    } catch (err) {
      return {
        status: false,
        code: 500,
        data: "Error when fetching the data",
      }
    }
  }

  /**
   * This is a function that is used to create a new user. 
   * @param user 
   * @returns 
   */
  public create = async (user: UserEntity) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const isExists = await this.checkEmail(user.email);
      if (isExists) {
        await queryRunner.rollbackTransaction();
        return {
          status: false,
          data: "Email already exists",
        };
      }
      const create = await this.userRepository.save(user);
      await queryRunner.commitTransaction();
      return {
        status: true,
        data: create,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return {
        status: false,
        data: "Internal Server Error"
      };
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * This is a function that is used to create a deposit by user id. 
   * @param transaction 
   * @param userId 
   * @returns 
   */
  public deposit = async (transaction: TransactionEntity, userId: number) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const user = await this.checkUserById(userId);

      // check if user is exists
      if (user === null) {
        return {
          status: false,
          code: 404,
          data: "User ID Invalid. User Not Found"
        }
      } else {
        /* INSERT DEPOSIT DATA */
        const insertDeposit = this.transactionRepository.create({
          amount: transaction.amount,
          type: TransactionType.DEPOSIT,
          user: user,
        });
        await this.transactionRepository.save(insertDeposit);
        
        this.updateBalanceUser(user.id, TransactionType.DEPOSIT, transaction.amount);
        await queryRunner.commitTransaction();
        const updated = await this.checkUserById(userId);
        return {
          status: true,
          code: 200,
          data: updated,
        }
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return {
        status: false,
        code: 500,
        data: "Internal Server Error",
      }
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * This is a function that is used to create a deposit by user id.  
   * @param transaction 
   * @param userId 
   * @returns 
   */
  public withdraw = async (transaction: TransactionEntity, userId: number) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const user = await this.checkUserById(userId);

      // checking if users is exists
      if (user === null) {
        return {
          status: false,
          code: 404,
          data: "User ID Invalid. User Not Found",
        }
      } else {

        // checking if wd amount is more thank user balance
        if (transaction.amount > user.balance) {
          await queryRunner.rollbackTransaction();
          return {
            status: false,
            code: 400,
            data: "Not enough balance",
          }
        }

        // INSERT WITHDRAW DATA
        const insertWithdraw = this.transactionRepository.create({
          amount: transaction.amount,
          type: TransactionType.WITHDRAW,
          user: user,
        });
        await this.transactionRepository.save(insertWithdraw);

        this.updateBalanceUser(user.id, TransactionType.WITHDRAW, transaction.amount);
        await queryRunner.commitTransaction();
        const updated = await this.checkUserById(userId);
        return {
          status: true,
          code: 200,
          data: updated,
        }
      }
    } catch(err) {
      await queryRunner.rollbackTransaction();
      return {
        status: false,
        code: 500,
        data: "Internal Server Error"
      }
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * This is a function that is used to check email if exists or not.
   * @param email string
   * @returns 
   */
  private checkEmail = async (email: string) => {
    const check = await this.userRepository.findOneBy({
      email: email
    });
    return check;
  }

  /**
   * This is a function that is used to check user by id.
   * @param userId 
   * @returns 
   */
  private checkUserById = async (userId: number) => {
    const user = await this.userRepository.findOneBy({
      id: userId
    });
    return user;
  }

  /**
   * This is a function that is used to update balance user.
   * @param userId 
   * @param type 
   * @param amount 
   * @returns 
   */
  private updateBalanceUser = async (userId: number, type: TransactionType, amount: number) => {
    if (type === TransactionType.DEPOSIT) {
      return await this.userRepository.increment({
        id: userId,
      }, "balance", amount);
    } else if (type === TransactionType.WITHDRAW) {
      return await this.userRepository.decrement({
        id: userId,
      }, "balance", amount);
    }
  }
}