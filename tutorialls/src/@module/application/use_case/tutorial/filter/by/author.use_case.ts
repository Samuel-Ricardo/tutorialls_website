import { AxiosHttpTutorialGatewaySupport } from '@/@module/application/support/gateway/http/tutorial/tutorial.support';
import { IFilterTutorialsByAuthorDTO } from '@/@module/domain/DTO/tutorial/filter/by/author.dto';
import { IFilterTutorialsByAuthorUseCase } from '@/@module/domain/use_case/tutorials/filter/by/author.use_case';
import { injectable } from 'inversify';

@injectable()
export class FilterTutorialByAuthorUseCase
  extends AxiosHttpTutorialGatewaySupport
  implements IFilterTutorialsByAuthorUseCase
{
  async execute(DTO: IFilterTutorialsByAuthorDTO) {
    return this.gateway.findByAuthor(DTO);
  }
}
