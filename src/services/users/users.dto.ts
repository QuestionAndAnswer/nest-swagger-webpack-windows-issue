import { UserCreate, User } from "./users.contract";
import { IsString } from "class-validator";

export class CreateUserDto implements UserCreate {
    @IsString()
    public name: string;
}

export class UserDto implements User {
    public id: string;
    public name: string;
}