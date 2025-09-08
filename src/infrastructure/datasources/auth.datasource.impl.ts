import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto
        try {

            // 1. Verify if the user exist

            // 2. Password Hash

            // 3. Map the answer to OWN entity
            return new UserEntity(
                '1',
                name,
                email,
                password,
                ["ADMIN_ROLE"]
            )

        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw error
        }

    }

}