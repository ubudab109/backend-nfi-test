import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { TransactionEntity } from "./transaction.entities";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column({
    unique: true,
  })
  email: string

  @Column({
    type: 'numeric',
    default: 0,
  })
  balance: number

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transaction: TransactionEntity[]

}