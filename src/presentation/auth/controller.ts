import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserUseCaseImp, RegisterUserDto, LoginUserDto, LoginUserUseCaseImp } from "../../domain"
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

        new RegisterUserUseCaseImp(this.authRepository)
            .execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))


    }


    loginUserUser = (req: Request, res: Response) => {

        const [error, loginuserDto] = LoginUserDto.create(req.body)
        if (error) {
            return res
                .status(400)
                .json({ error })
        }

        new LoginUserUseCaseImp(this.authRepository)
            .execute(loginuserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))

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