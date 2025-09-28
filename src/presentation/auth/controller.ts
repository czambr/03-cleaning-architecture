import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain"
import { JwtAdapter } from "../../config"
import { UserModel } from "../../data/mongodb"

export class AuthController {

    // DI
    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res
                .status(error.statysCode)
                .json({ error: error.message })
        }

        return res
            .status(500)
            .json({ error: 'Internal Server Error' })
    }


    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if (error) {
            return res
                .status(400)
                .json({
                    error
                })
        }


        this.authRepository.register(registerUserDto!)
            .then(async (user) => {
                const token = await JwtAdapter.generateToken({ id: user.id })
                res.json({
                    user,
                    token
                })
            })
            .catch(error => this.handleError(error, res))


    }


    loginUserUser = (req: Request, res: Response) => {
        res.json('Login user controller')

    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
            .then(users => res.json({
                users,
                user: req.body.user
            }))
            .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
    }

}