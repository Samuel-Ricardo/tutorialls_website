import { MODULE } from '@/@module/app.registry';
import { injectGateway } from '@/@module/application/gateway/gateway.module';
import type { ITutorialGateway } from '@/@module/domain/gateway/tutorial/tutorial.gateway';
import { injectable } from 'inversify';

@injectable()
export abstract class AxiosHttpTutorialGatewaySupport {
  @injectGateway(MODULE.APPLICATION.GATEWAY.HTTP.AXIOS.TUTORIAL)
  protected readonly gateway!: ITutorialGateway;
}
