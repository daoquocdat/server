import {Response, Request} from 'express';
import * as bcrypt from 'bcrypt';
import {getRepository} from 'typeorm';
import {User} from '../entity/User';
import jwt from 'jsonwebtoken'

const maxAge = 3*24*60*60
const createToken = (id) =>{
    return jwt.sign({ id }, 'next user secret', { 
        expiresIn: maxAge 
    })
}
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
     const users = await getRepository(User).find();
     return res.json(users);
};

export const register = async (req: Request, res: Response): Promise<Response> => {
    var {
        name,
        username,
        password,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const user = User.create({
        name,
        username,
        password
    })
    await user.save();
    const token = createToken(user.id)
    console.log(token)
    console.log('Register successfully')
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
    return res.json({ user: user.id, message: 'Register successfully'}) 
} ;
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).delete(req.params.id);
    return res.json("Delete user successfully!");
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({username: req.body.username});
    if(user){
        const checkPassword = await bcrypt.compare(req.body.password, user.password);

        if(checkPassword){
            const token = createToken(user.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
            return res.json({ message: 'Login successfully' });
        }
        return res.json({ message: 'Login failed' });
    }
    return res.json({ message: 'Login failed' });
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        getRepository(User).merge(user, req.body);
        getRepository(User).save(user);
    }
    return res.json({msg:"Update user successfully!"});
}