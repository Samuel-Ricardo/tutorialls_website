import { IDeleteTutorialUseCase } from '@/@module/domain/use_case/tutorials/delete.use_case';
import { AxiosHttpTutorialGatewaySupport } from '../../support/gateway/http/tutorial/tutorial.support';
import { IDeleteTutorialDTO } from '@/tutorial/delete.dto';

export class DeleteTutorialUseCase
  extends AxiosHttpTutorialGatewaySupport
  implements IDeleteTutorialUseCase
{
  async execute(DTO: IDeleteTutorialDTO) {
    return this.gateway.delete(DTO);
  }
}
