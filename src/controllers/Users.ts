import {Response, Request} from 'express';
import * as bcrypt from 'bcrypt';
import {getRepository} from 'typeorm';
import {User} from '../entity/User';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
     const users = await getRepository(User).find();
     return res.json(users);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    var {
        name,
        username,
        password,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    console.log(password)
    const user = User.create({
        name,
        username,
        password
    })
    await user.save();
    return res.json(user);
} ;
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).delete(req.params.id);
    return res.json("Delete user successfully!");
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        getRepository(User).merge(user, req.body);
        getRepository(User).save(user);
    }
    return res.json({msg:"Update user successfully!"});
}