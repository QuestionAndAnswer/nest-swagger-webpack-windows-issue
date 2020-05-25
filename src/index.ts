import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConnectionOptions } from "typeorm";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const bootstrap = async () => {
    console.log("Starting app");

    const connectionOptions: ConnectionOptions = {
        name: "pg",
        database: "pg",
        type: "postgres",
        host: "localhost",
        port: 5432,
        password: "admin",
        username: "pgrowth",
        synchronize: true
    };
    
    const app = await NestFactory.create(
        AppModule.create(connectionOptions)
    );

    app.setGlobalPrefix("/api");

    const options = new DocumentBuilder()
        .setTitle('Professional and Team Growth App')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/swagger', app, document);

    await app.listen(8080);
    
    console.log("Started");
};

bootstrap()
    .catch(err => {
        console.error(err);
        process.exit(-1);
    });