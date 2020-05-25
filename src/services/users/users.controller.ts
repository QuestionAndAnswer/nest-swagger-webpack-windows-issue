import { Controller, Get, Param, Put, Body, ValidationPipe, UsePipes, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UserDto } from "./users.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("users")
@UsePipes(new ValidationPipe())
@ApiTags("Users")
export class UsersController {

    constructor (
        private readonly usersService: UsersService
    ) {}

    @Get()
    public getAll (): Promise<UserDto[]> {
        return this.usersService.find();
    }

    @Get("/:id")
    public get (
        @Param("id") id: string
    ): Promise<UserDto | undefined> {
        return this.usersService.get(id);
    }

    @Put()
    public create (
        @Body() user: CreateUserDto
    ): Promise<UserDto> {
        return this.usersService.create(user);
    }

    @Delete("/:id")
    public delete (
        @Param("id") id: string
    ): Promise<void> {
        return this.usersService.delete(id);
    }
}