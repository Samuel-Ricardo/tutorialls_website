import { IUserDTO } from '../../DTO/user.dto';
import { IDecodeUserDTO } from '../../DTO/user/decode.dto';

export interface IDecodeUserUseCase {
  execute(user: IDecodeUserDTO): Promise<IUserDTO>;
}
