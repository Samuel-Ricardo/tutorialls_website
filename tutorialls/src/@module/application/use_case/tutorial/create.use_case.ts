import { ICreateTutorialUseCase } from '@/@module/domain/use_case/tutorials/create.use_case';
import { AxiosHttpTutorialGatewaySupport } from '../../support/gateway/http/tutorial/tutorial.support';
import { injectable } from 'inversify';
import { ICreateTutorialDTO } from '@/@module/domain/DTO/tutorial/create.dto';

@injectable()
export class CreateTutorialUseCase
  extends AxiosHttpTutorialGatewaySupport
  implements ICreateTutorialUseCase
{
  async execute(tutorial: ICreateTutorialDTO) {
    return this.gateway.create(tutorial);
  }
}
