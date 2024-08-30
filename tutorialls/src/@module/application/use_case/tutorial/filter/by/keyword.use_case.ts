import { AxiosHttpTutorialGatewaySupport } from '@/@module/application/support/gateway/http/tutorial/tutorial.support';
import { IFilterTutorialsByKeywordUseCase } from '@/@module/domain/use_case/tutorials/filter/by/keyword.use_case';
import { IFilterTutorialsByContentDTO } from '@/tutorial/filter/by/content.dto';
import { injectable } from 'inversify';

@injectable()
export class FilterTutorialByKeywordUseCase
  extends AxiosHttpTutorialGatewaySupport
  implements IFilterTutorialsByKeywordUseCase
{
  async execute(DTO: IFilterTutorialsByContentDTO) {
    return this.gateway.findByKeywordInContent(DTO);
  }
}
