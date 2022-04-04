import * as express from "express";


import "reflect-metadata";
import {createConnection} from "typeorm";
import userRouter from "./routes/user";
import {User} from "./entity/User";

const app =  express();

app.use(express.json());

app.use(userRouter);

createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.name = "Timber";
    // user.username = "dat";
    // user.password = "123";
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");
    console.log("connect successfully!")

}).catch(error => console.log(error));

app.listen(3000);
console.log("http://localhost:3000");