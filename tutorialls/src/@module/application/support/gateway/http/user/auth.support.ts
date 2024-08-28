import { MODULE } from '@/@module/app.registry';
import { injectGateway } from '@/@module/application/gateway/gateway.module';
import type { IAuthGateway } from '@/@module/domain/gateway/user/auth.gateway';
import { injectable } from 'inversify';

@injectable()
export abstract class AxiosHttpAuthGatewaySupport {
  @injectGateway(MODULE.APPLICATION.GATEWAY.HTTP.AXIOS.AUTH)
  protected readonly gateway!: IAuthGateway;
}
