import { DataSource } from "typeorm"
import { User } from "./src/entity/user.entity"
import { Role } from "./src/entity/role.entity"
import { Permission } from "./src/entity/permission.entity"
import { Product } from "./src/entity/product.entity"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "sql8.freemysqlhosting.net",
    port: 3306,
    username: "sql8613739",
    password: "SIIXMAX3Rn",
    database: "sql8613739",
    synchronize: true,
    logging: false,
    entities: [User, Role, Permission, Product]
})