import {
  Entity, PrimaryColumn, PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Action {
    @PrimaryGeneratedColumn("uuid")
    id: string
}
