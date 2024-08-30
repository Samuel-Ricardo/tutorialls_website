import { AxiosHttpTutorialGatewaySupport } from '@/@module/application/support/gateway/http/tutorial/tutorial.support';
import { IListAllTutorialsUseCase } from '@/@module/domain/use_case/tutorials/list/all.use_case';
import { IListAllTutorialsDTO } from '@/tutorial/list/all.dto';
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
