import { AxiosHttpTutorialGatewaySupport } from '@/@module/application/support/gateway/http/tutorial/tutorial.support';
import { IFilterTutorialsByTitleUseCase } from '@/@module/domain/use_case/tutorials/filter/by/title.use_case';
import { IFilterTutorialsByTitleDTO } from '@/tutorial/filter/by/title.dto';
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
