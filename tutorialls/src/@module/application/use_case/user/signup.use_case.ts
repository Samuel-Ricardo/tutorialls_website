import { ISignupUserDTO } from '@/@module/domain/DTO/user/signup.dto';
import { ISignupUserUseCase } from '@/@module/domain/use_case/user/signup.use_case';
import { injectable } from 'inversify';
import { AxiosHttpAuthGatewaySupport } from '../../support/gateway/http/user/auth.support';

@injectable()
export class SignupUserUseCase
  extends AxiosHttpAuthGatewaySupport
  implements ISignupUserUseCase
{
  async execute(user: ISignupUserDTO) {
    return this.gateway.signup(user);
  }
}
