import { ILoginUserDTO } from '../../DTO/user/login.dto';

export interface ILoginUserUseCase {
  execute(user: ILoginUserDTO): Promise<string>;
}
