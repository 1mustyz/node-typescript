import { Router } from "express";
import {Register,Login, AuthenticatedUser, Logout, UpdateInfo, UpdatePassword} from './controller/auth.controller'
import { AuthMiddleware } from "./middleware/auth.middleware";
import { CreateUser, GetUser, Users } from "./controller/user.controller";
import { Permissions } from "./controller/permission.controller";
import { CreateRole, GetRole, Roles } from "./controller/role.controller";
import { CreateProduct, GetProduct, Products } from "./controller/product.controller";


export const routes = (router:Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/logout', AuthMiddleware, Logout)
    router.put('/api/users/info', AuthMiddleware, UpdateInfo)
    router.put('/api/users/password', AuthMiddleware, UpdatePassword)

    router.get('/api/users', AuthMiddleware, Users)
    router.get('/api/users/:id', AuthMiddleware, GetUser)
    router.post('/api/users', AuthMiddleware, CreateUser)

    router.get('/api/permissions', AuthMiddleware, Permissions)

    router.get('/api/roles', AuthMiddleware, Roles)
    router.post('/api/roles', AuthMiddleware, CreateRole)
    router.get('/api/roles/:id', AuthMiddleware, GetRole)

    router.get('/api/product', AuthMiddleware, Products)
    router.get('/api/product/:id', AuthMiddleware, GetProduct)
    router.post('/api/product', AuthMiddleware, CreateProduct)





}

