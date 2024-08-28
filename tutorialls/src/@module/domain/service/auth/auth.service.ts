import { ILoginUserDTO } from '../../DTO/user/login.dto';
import { ISignupUserDTO } from '../../DTO/user/signup.dto';

export interface IAuthService {
  login(user: ILoginUserDTO): Promise<string>;
  signup(user: ISignupUserDTO): Promise<boolean>;
}
