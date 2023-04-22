import { Request, Response } from "express"
import { AppDataSource } from "../../data.source"
import { Role } from "../entity/role.entity"

const roleRepository = AppDataSource.getRepository(Role)

export const Roles = async (req: Request, res: Response) => {
    res.send( await roleRepository.find())

}

export const CreateRole = async (req: Request, res: Response) => {
    const {name, permissions} = req.body

    const role = await roleRepository.save({
        name,
        permissions: permissions.map(id => {
            return {
                id: id
            }
        })
    })

    res.send(role)


}

export const GetRole = async (req: Request, res: Response) => {
    res.send( await roleRepository.findOne({
        where:{id: Number(req.params.id)},
        relations: ['permissions']
    }))

}