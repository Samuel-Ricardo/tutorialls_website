import { IUpdateTutorialUseCase } from '@/@module/domain/use_case/tutorials/update.use_case';
import { IUpdateTutorialDTO } from '@/tutorial/update.dto';
import { AxiosHttpTutorialGatewaySupport } from '../../support/gateway/http/tutorial/tutorial.support';

export class UpdateTutorialUseCase
  extends AxiosHttpTutorialGatewaySupport
  implements IUpdateTutorialUseCase
{
  async execute(DTO: IUpdateTutorialDTO) {
    return this.gateway.update(DTO);
  }
}
