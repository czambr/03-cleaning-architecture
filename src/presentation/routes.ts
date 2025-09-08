import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {

    static get routes(): Router {
        const router = Router()

        // define  my principal routes
        router.use('/api/auth', AuthRoutes.routes)

        // router.use('/api/user')
        // router.use('/api/products')
        // router.use('/api/clients')

        return router
    }
}