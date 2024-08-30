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
import { ITutorialDTO } from '@/tutorial/tutorial.dto';
import { IUpdateTutorialDTO } from '@/tutorial/update.dto';
import { injectable } from 'inversify';

@injectable()
export class AxiosHttpTutorialGateway implements ITutorialGateway {
  @injectEngine(MODULE.INFRA.ENGINE.GATEWAY.HTTP.AXIOS)
  private readonly engine!: AxiosHttpGateway;
  @injectConfig(MODULE.INFRA.CONFIG.API.URL)
  private readonly baseApiUrl!: string;

  private readonly api_url = `${this.baseApiUrl}/tutorial`;

  async create(tutorial: ICreateTutorialDTO) {
    const response = await this.engine.post<ITutorialDTO>(
      `${this.api_url}`,
      tutorial,
    );

    return Tutorial.fromDTO(response.data);
  }

  async update(tutorial: IUpdateTutorialDTO) {
    return Tutorial.fromDTO(
      (
        await this.engine.put<ITutorialDTO>(
          `${this.api_url}/${tutorial.id}`,
          tutorial,
        )
      ).data,
    );
  }

  async delete(tutorial: IDeleteTutorialDTO) {
    return (
      (await this.engine.delete(`${this.api_url}/${tutorial.id}`)).status ===
      200
    );
  }

  async listAll({ pagination: { limit, page } }: IListAllTutorialsDTO) {
    const response = (
      await this.engine.get(`${this.api_url}?page=${page}&limit=${limit}`)
    ).data as IPaginationOutputDTO<ITutorialDTO>;

    return {
      ...response,
      items: response.items.map(Tutorial.fromDTO),
    } as IPaginationOutputDTO<Tutorial>;
  }

  async findByTitle({ title, limit, page }: IFilterTutorialsByTitleDTO) {
    const response = (
      await this.engine.get(
        `${this.api_url}/title?title=${title}&page=${page}&limit=${limit}`,
      )
    ).data as IPaginationOutputDTO<ITutorialDTO>;

    return {
      ...response,
      items: response.items.map(Tutorial.fromDTO),
    } as IPaginationOutputDTO<Tutorial>;
  }

  async findByAuthor({ author, limit, page }: IFilterTutorialsByAuthorDTO) {
    const response = (
      await this.engine.get(
        `${this.api_url}/author?author=${author}&page=${page}&limit=${limit}`,
      )
    ).data as IPaginationOutputDTO<ITutorialDTO>;

    return {
      ...response,
      items: response.items.map(Tutorial.fromDTO),
    } as IPaginationOutputDTO<Tutorial>;
  }

  async findByKeywordInContent({ keyword }: IFilterTutorialsByContentDTO) {
    const response = (
      await this.engine.get(`${this.api_url}/content?keyword=${keyword}`)
    ).data as IPaginationOutputDTO<ITutorialDTO>;

    return {
      ...response,
      items: response.items.map(Tutorial.fromDTO),
    } as IPaginationOutputDTO<Tutorial>;
  }
}
