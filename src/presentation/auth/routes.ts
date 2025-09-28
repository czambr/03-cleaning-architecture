import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleare";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router()

        const dataBase = new AuthDatasourceImpl();

        const authRepository = new AuthRepositoryImpl(dataBase);

        const controller = new AuthController(authRepository);

        // define  my principal rputes
        router.get('/', AuthMiddleware.validateJwt, controller.getUsers)

        router.post('/register', controller.registerUser)
        router.post('/login', controller.loginUserUser)



        return router
    }
}