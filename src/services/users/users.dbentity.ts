import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./users.contract";

@Entity()
export class UserDbEntity implements User {
    @PrimaryGeneratedColumn()
    public id: string;
    @Column()
    public name: string;
}