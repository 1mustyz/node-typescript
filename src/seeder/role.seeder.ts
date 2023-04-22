import { AppDataSource } from "../../data.source";
import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";

AppDataSource.initialize()
.then(async () => {
    
   const permissionRepository = AppDataSource.getRepository(Permission)
   const roleRepository = AppDataSource.getRepository(Role)


   const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders']

    const permissions = []
    try {
        
        for (const val of perms) {
            const p = await permissionRepository.save({ name: val });
            permissions.push(p);
        }

        await roleRepository.save({
            name: 'Admin',
            permissions
        })

        delete permissions[3]

        await roleRepository.save({
            name: 'Editor',
            permissions
        })

        delete permissions[1]
        delete permissions[5]
        delete permissions[7]



        await roleRepository.save({
            name: 'Viewer',
            permissions
        })

    } catch (error) {
        console.log('error')
        
    }

       process.exit(0)

})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})