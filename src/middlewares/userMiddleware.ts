import * as jwt from 'jsonwebtoken'
import * as express from 'express'
export const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    console.log(token)
    if(token){
        jwt.verify(token, 'next user secret', (err, decodedToken)=>{
            if (err){
                console.log(err)
                res.redirect('http://localhost:3000/login')
            }else{
                next()
            }
        })
    }
    else{
        res.redirect('http://localhost:3000/login')
    }
}