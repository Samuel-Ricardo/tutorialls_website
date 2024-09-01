import { AxiosHttpTutorialGatewaySupport } from '@/@module/application/support/gateway/http/tutorial/tutorial.support';
import { IFilterTutorialsByContentDTO } from '@/@module/domain/DTO/tutorial/filter/by/content.dto';
import { IFilterTutorialsByKeywordUseCase } from '@/@module/domain/use_case/tutorials/filter/by/keyword.use_case';

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
