import { Request, Response } from "express"
import { AppDataSource } from "../../data.source"
import { Permission } from "../entity/permission.entity"


const permissionRepository = AppDataSource.getRepository(Permission)

export const Permissions = async (req: Request, res: Response) => {
    res.send( await permissionRepository.find())

}