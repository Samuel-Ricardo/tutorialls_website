import { AxiosHttpTutorialGatewaySupport } from '@/@module/application/support/gateway/http/tutorial/tutorial.support';
import { IFilterTutorialsByAuthorUseCase } from '@/@module/domain/use_case/tutorials/filter/by/author.use_case';
import { IFilterTutorialsByAuthorDTO } from '@/tutorial/filter/by/author.dto';
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
