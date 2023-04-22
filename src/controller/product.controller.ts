import { Request, Response } from "express";
import { AppDataSource } from "../../data.source";
import { Product } from "../entity/product.entity";


const productRepository = AppDataSource.getRepository(Product)

export const Products = async (req: Request, res: Response) => {

    res.send(await productRepository.find())
}

export const CreateProduct = async (req: Request, res: Response) => {

    try {
        
        const product = await productRepository.save(req.body)
    
        res.send(product)
    } catch (error) {
        if(error.name === 'EntityMetadataNotFoundError') return res.status(500).send(error.message)
        if(error.name === 'QueryFailedError') return res.status(400).send(error.message)
    }

}

export const GetProduct = async (req:Request, res: Response) => {
    const product = await productRepository.findOne({
        where:{id: Number(req.params.id)},
    })

    res.send(product)

}