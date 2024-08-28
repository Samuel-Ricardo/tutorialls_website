import { IUserDTO } from '@/@module/domain/DTO/user.dto';
import { IDecryptUserDTO } from '@/@module/domain/DTO/user/security/decrypt.dto';

export interface IDecryptUserUseCase {
  execute(user: IDecryptUserDTO): Promise<IUserDTO>;
}
