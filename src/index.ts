import * as express from "express";

import * as cors from 'cors';
const bodyParser = require('body-parser');
import "reflect-metadata";
import {createConnection} from "typeorm";
import userRouter from "./routes/user";
import {User} from "./entity/User";

const app =  express();
const port = process.env.PORT || 4000
createConnection().then(async connection => {  
    console.log("connect successfully!")
}).catch(error => console.log(error));
app.use(express.json());
app.use(cors({origin:"https://serverappnodejs.herokuapp.com", credentials: true}));
app.use(userRouter);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname));

app.listen(port);
console.log("http://localhost:4000");