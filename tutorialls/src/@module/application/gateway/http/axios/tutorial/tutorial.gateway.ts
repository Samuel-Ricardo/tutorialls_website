import { MODULE } from '@/@module/app.registry';
import { Tutorial } from '@/@module/domain/entity/tutorial.entity';
import { ITutorialGateway } from '@/@module/domain/gateway/tutorial/tutorial.gateway';
import { injectConfig } from '@/@module/infra/config/config.module';
import { injectEngine } from '@/@module/infra/engine/engine.module';
import { AxiosHttpGateway } from '@/@module/infra/engine/gateway/http/axios/axios.gateway';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { ICreateTutorialDTO } from '@/tutorial/create.dto';
import { IDeleteTutorialDTO } from '@/tutorial/delete.dto';
import { IFilterTutorialsByAuthorDTO } from '@/tutorial/filter/by/author.dto';
import { IFilterTutorialsByContentDTO } from '@/tutorial/filter/by/content.dto';
import { IFilterTutorialsByTitleDTO } from '@/tutorial/filter/by/title.dto';
import { IListAllTutorialsDTO } from '@/tutorial/list/all.dto';
import { IUpdateTutorialDTO } from '@/tutorial/update.dto';
import { injectable } from 'inversify';

@injectable()
export class AxiosHttpTutorialGateway implements ITutorialGateway {
  create(tutorial: ICreateTutorialDTO): Promise<Tutorial> {
    throw new Error('Method not implemented.');
  }
  update(tutorial: IUpdateTutorialDTO): Promise<Tutorial> {
    throw new Error('Method not implemented.');
  }
  delete(tutorial: IDeleteTutorialDTO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  listAll(DTO: IListAllTutorialsDTO): Promise<IPaginationOutputDTO<Tutorial>> {
    throw new Error('Method not implemented.');
  }
  findByTitle(
    DTO: IFilterTutorialsByTitleDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>> {
    throw new Error('Method not implemented.');
  }
  findByAuthor(
    DTO: IFilterTutorialsByAuthorDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>> {
    throw new Error('Method not implemented.');
  }
  findByKeywordInContent(
    DTO: IFilterTutorialsByContentDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>> {
    throw new Error('Method not implemented.');
  }
  @injectEngine(MODULE.INFRA.ENGINE.GATEWAY.HTTP.AXIOS)
  private readonly engine!: AxiosHttpGateway;
  @injectConfig(MODULE.INFRA.CONFIG.API.URL)
  private readonly baseApiUrl!: string;

  private readonly api_url = `${this.baseApiUrl}/tutorial`;
}
