import { IEncryptUserDTO } from '@/@module/domain/DTO/user/security/encrypt.dto';

export interface IEncryptUserUseCase {
  execute(user: IEncryptUserDTO): Promise<string>;
}
