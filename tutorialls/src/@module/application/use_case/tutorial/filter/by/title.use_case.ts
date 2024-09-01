import { AxiosHttpTutorialGatewaySupport } from '@/@module/application/support/gateway/http/tutorial/tutorial.support';
import { IFilterTutorialsByTitleDTO } from '@/@module/domain/DTO/tutorial/filter/by/title.dto';
import { IFilterTutorialsByTitleUseCase } from '@/@module/domain/use_case/tutorials/filter/by/title.use_case';
import { injectable } from 'inversify';

@injectable()
export class FilterTutorialByTitleUseCase
  extends AxiosHttpTutorialGatewaySupport
  implements IFilterTutorialsByTitleUseCase
{
  async execute(DTO: IFilterTutorialsByTitleDTO) {
    return this.gateway.findByTitle(DTO);
  }
}
