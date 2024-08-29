import { ILoginUserUseCase } from '@/@module/domain/use_case/user/login.use_case';
import { AxiosHttpAuthGatewaySupport } from '../../support/gateway/http/user/auth.support';
import { injectable } from 'inversify';
import { ILoginUserDTO } from '@/@module/domain/DTO/user/login.dto';

@injectable()
export class LoginUserUseCase
  extends AxiosHttpAuthGatewaySupport
  implements ILoginUserUseCase
{
  async execute(user: ILoginUserDTO) {
    return this.gateway.login(user);
  }
}
