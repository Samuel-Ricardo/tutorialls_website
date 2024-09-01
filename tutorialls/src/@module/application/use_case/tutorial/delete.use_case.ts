import { IDeleteTutorialUseCase } from '@/@module/domain/use_case/tutorials/delete.use_case';
import { AxiosHttpTutorialGatewaySupport } from '../../support/gateway/http/tutorial/tutorial.support';

import { injectable } from 'inversify';
import { IDeleteTutorialDTO } from '@/@module/domain/DTO/tutorial/delete.dto';

@injectable()
export class DeleteTutorialUseCase
  extends AxiosHttpTutorialGatewaySupport
  implements IDeleteTutorialUseCase
{
  async execute(DTO: IDeleteTutorialDTO) {
    return this.gateway.delete(DTO);
  }
}
