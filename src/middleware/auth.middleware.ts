import { Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { AppDataSource } from "../../data.source"
import { User } from "../entity/user.entity"


const userRepository = AppDataSource.getRepository(User)

export const AuthMiddleware = async (req: Request, res: Response, next: Function) =>{
    try {
        
        const jwt = req.cookies['jwt']
        
        const payload: any = verify(jwt, process.env.SECRET_KEY)
    
        if(!payload){
            return res.status(400).send({message: 'Unathenticated'})
        }
    
        const {password, ...user} = await userRepository.findOne({where: {id: payload.id}})
        req["user"] = user

        next()
    } catch (error) {
        return res.status(400).send({message: 'Unathenticated'})
        
    }


}