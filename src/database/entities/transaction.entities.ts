import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { TransactionType } from "../../utils/transaction-type.enum";
import { UserEntity } from "./user.entities";

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({
    type: "enum",
    enum: TransactionType,
    default: null
  })
  type: TransactionType

  @Column('numeric')
  amount: number

  @ManyToOne(() => UserEntity, (user) => user.transaction)
  user: UserEntity

}