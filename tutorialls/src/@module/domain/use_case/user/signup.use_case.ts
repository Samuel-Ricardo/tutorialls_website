import { ISignupUserDTO } from '../../DTO/user/signup.dto';

export interface ISignupUserUseCase {
  execute(user: ISignupUserDTO): Promise<boolean>;
}
