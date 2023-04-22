import { Request, Response } from "express";
import { AppDataSource } from "../../data.source";
import { User } from "../entity/user.entity";
import bcryptjs from 'bcryptjs'



const userRepository = AppDataSource.getRepository(User)

export const Users = async (req: Request, res: Response) => {

    res.send(await userRepository.find({
        select: ["id", "first_name", "last_name", "email",],
        relations:['role']
      }))
}

export const CreateUser = async (req: Request, res: Response) => {
    const {role_id, ...body} = req.body

    const hashedPassword = await bcryptjs.hash('123', 10)

    try {
        
        const {password, ...user} = await userRepository.save({
            ...body,
            password: hashedPassword,
            role: {id: role_id}
        })
    
        res.send(user)
    } catch (error) {
        if(error.name === 'EntityMetadataNotFoundError') return res.status(500).send(error.message)
        if(error.name === 'QueryFailedError') return res.status(400).send(error.message)
    }

}

export const GetUser = async (req:Request, res: Response) => {
    const user = await userRepository.findOne({
        where:{id: Number(req.params.id)},
        select: ["id", "first_name", "last_name", "email", "role"],
        relations:['role']
    })

    res.send(user)

}