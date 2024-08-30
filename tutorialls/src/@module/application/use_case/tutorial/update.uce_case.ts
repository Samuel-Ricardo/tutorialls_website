import { IUpdateTutorialUseCase } from '@/@module/domain/use_case/tutorials/update.use_case';
import { AxiosHttpTutorialGatewaySupport } from '../../support/gateway/http/tutorial/tutorial.support';
import { injectable } from 'inversify';
import { IUpdateTutorialDTO } from '@/@module/domain/DTO/tutorial/update.dto';

@injectable()
export class UpdateTutorialUseCase
  extends AxiosHttpTutorialGatewaySupport
  implements IUpdateTutorialUseCase
{
  async execute(DTO: IUpdateTutorialDTO) {
    return this.gateway.update(DTO);
  }
}
