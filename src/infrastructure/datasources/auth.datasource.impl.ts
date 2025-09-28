import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";


type HasFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean
export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hasPassword: HasFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto

        try {
            // 1. Verify if the user exist
            const userExist = await UserModel.findOne({ email: email })
            if (userExist) throw CustomError.badRequest('User or password are invalid');

            // 2. Password Hash
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hasPassword(password),
            })
            await user.save();


            // 3. Map the answer to OWN entity
            return UserMapper.userEntityFromObject(user)

        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            console.log(error)
            throw CustomError.internalServer();
        }

    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto

        try {
            const user = await UserModel.findOne({ email: email })
            if (!user) {
                throw CustomError.badRequest('User or password are invalid - email');
            }

            const matchingPassword = this.comparePassword(password, user.password)
            if (!matchingPassword) {
                throw CustomError.badRequest('User or password are invalid - password');
            }

            return UserMapper.userEntityFromObject(user)

        } catch (error) {

            if (error instanceof CustomError) {
                throw error
            }
            console.log(error)
            throw CustomError.internalServer();
        }
    }

}