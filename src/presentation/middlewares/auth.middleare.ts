import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { error } from "console";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {

    static async validateJwt(req: Request, res: Response, next: NextFunction) {

        const authorization = req.header('Authorization')
        if (!authorization) {
            return res
                .status(401)
                .json({ error: 'No token provided' })
        }

        if (!authorization.startsWith('Bearer')) {
            return res
                .json(401)
                .json({ error: 'Invalid bearer token' })
        }


        const token = authorization.split(' ')[1] || ''
        try {
            const payload = await JwtAdapter.validateJtw<{ id: string }>(token)
            if (!payload) {
                return res
                    .status(401)
                    .json({ error: 'Invalid token' })
            }

            const user = await UserModel.findById(payload.id)
            if (!user) {
                return res
                    .status(400)
                    .json({
                        error: 'Invalid token - user not found'
                    })
            }

            req.body.user = user
            next()
        } catch (error) {
            console.log(error)

            return res
                .status(500)
                .json('Internal server error')
        }

    }
}