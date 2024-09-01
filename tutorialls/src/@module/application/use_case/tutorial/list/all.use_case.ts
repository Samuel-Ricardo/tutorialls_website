import { AxiosHttpTutorialGatewaySupport } from '@/@module/application/support/gateway/http/tutorial/tutorial.support';
import { IListAllTutorialsDTO } from '@/@module/domain/DTO/tutorial/list/all.dto';
import { IListAllTutorialsUseCase } from '@/@module/domain/use_case/tutorials/list/all.use_case';
import { injectable } from 'inversify';

@injectable()
export class ListAllTutorialsUseCase
  extends AxiosHttpTutorialGatewaySupport
  implements IListAllTutorialsUseCase
{
  async execute(DTO: IListAllTutorialsDTO) {
    return this.gateway.listAll(DTO);
  }
}
