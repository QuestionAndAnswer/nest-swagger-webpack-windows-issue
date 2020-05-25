import { Module, DynamicModule } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ConnectionOptions, createConnection } from "typeorm";
import { UserDbEntity } from "./users.dbentity";

@Module({
    controllers: [
        UsersController
    ]
})
export class UsersModule {
    public static create (
        options: ConnectionOptions
    ): DynamicModule {
        return {
            module: UsersModule,
            providers: [
                {
                    provide: UsersService,
                    useFactory: async (): Promise<UsersService> => {
                        const connection = await createConnection({
                            ...options,
                            entities: [UserDbEntity]
                        });

                        return new UsersService(connection.getRepository(UserDbEntity));
                    }
                }
            ],
            exports: [
                UsersService
            ]
        };
    }
}