import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";
import { AppDataSource } from "../../data.source";
import { User } from "../entity/user.entity";
import bcryptjs from 'bcryptjs'
import { sign, verify } from "jsonwebtoken";


const userRepository = AppDataSource.getRepository(User)

export const Register = async (req: Request, res: Response) => {
    const body = req.body

    const {error} = RegisterValidation.validate(body)

    if(error){
        return res.status(400).send(error.details[0].message)
    }
    try {
        
        const {password, ...user} = await userRepository.save({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: await bcryptjs.hash(body.password, 10)
        })
    
        res.send(user)
    } catch (error) {
        if(error.name === 'EntityMetadataNotFoundError') return res.status(500).send(error.message)
        if(error.name === 'QueryFailedError') return res.status(400).send(error.message)
    }
}

export const Login = async(req: Request, res: Response) => {
    const user = await userRepository.findOne({where:{email: req.body.email}})
    if(!user) {
        return res.status(404).send({
            message:'Invalid credentials'
        })
    }

    const compare = await bcryptjs.compare(req.body.password, user.password)
    if(!compare){
        return res.status(404).send({
            message: 'Invalid credentials'
        })
    }

    const token = sign({id: user.id}, process.env.SECRET_KEY)

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1day
    })

    return res.send({
        message: "success"
    })
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
    try {
        res.send(req['user'])
    } catch (error) {
        return res.status(400).send({message: 'Unathenticated'})
    }

}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 0})
    res.send({message: 'success'})
}

export const UpdateInfo = async (req: Request, res: Response) => {
    const user = req["user"]

    await userRepository.update({id: user.id}, req.body)

    const {password, ...data} = await userRepository.findOne({where: {id: user.id}}) 

    res.send(data)
}

export const UpdatePassword = async (req: Request, res: Response) => {
    const user = req['user']

    if(req.body.password !== req.body.passwordConfirm){
        return res.status(404).send({
            message: 'Password do not match'
        })
    }

    await userRepository.update({id: user.id}, {
        password: await bcryptjs.hash(req.body.password, 10)
    })

    const {password, ...data} = req['user']

    res.send(data)
}