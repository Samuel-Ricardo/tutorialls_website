import { ILoginUserDTO } from '../../DTO/user/login.dto';
import { ISignupUserDTO } from '../../DTO/user/signup.dto';

export interface IAuthGateway {
  signup(user: ISignupUserDTO): Promise<boolean>;
  login(user: ILoginUserDTO): Promise<string>;
}
