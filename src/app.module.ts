import { Module, DynamicModule } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";
import { UsersModule } from "./services/users/users.module";

@Module({})
export class AppModule {
    public static create (options: ConnectionOptions): DynamicModule {
        return {
            module: AppModule,
            imports: [
                UsersModule.create(options)
            ]
        };
    }
}