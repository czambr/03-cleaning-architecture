import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

export abstract class AuthDatasource {

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
    // abstract login (loginUserDto: LoginUse)
}