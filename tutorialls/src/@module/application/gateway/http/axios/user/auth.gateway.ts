import { MODULE } from '@/@module/app.registry';
import { ILoginUserDTO } from '@/@module/domain/DTO/user/login.dto';
import { ISignupUserDTO } from '@/@module/domain/DTO/user/signup.dto';
import { IAuthGateway } from '@/@module/domain/gateway/user/auth.gateway';
import { injectConfig } from '@/@module/infra/config/config.module';
import { injectEngine } from '@/@module/infra/engine/engine.module';
import { AxiosHttpGateway } from '@/@module/infra/engine/gateway/http/axios/axios.gateway';
import { injectable } from 'inversify';

@injectable()
export class AxiosHttpAuthGateway implements IAuthGateway {
  @injectEngine(MODULE.INFRA.ENGINE.GATEWAY.HTTP.AXIOS)
  private readonly engine!: AxiosHttpGateway;
  @injectConfig(MODULE.INFRA.CONFIG.API.URL)
  private readonly baseApiUrl!: string;

  private readonly api_url = `${this.baseApiUrl}/auth`;

  async signup(user: ISignupUserDTO) {
    return (
      (await this.engine.post(`${this.api_url}/signup`, user)).status === 201
    );
  }
  async login(user: ILoginUserDTO) {
    return (await this.engine.post(`${this.api_url}/login`, user)).data.token;
  }
}
