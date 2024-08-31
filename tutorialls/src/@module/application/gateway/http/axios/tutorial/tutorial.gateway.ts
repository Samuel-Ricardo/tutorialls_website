import { MODULE } from '@/@module/app.registry';
import { ICreateTutorialDTO } from '@/@module/domain/DTO/tutorial/create.dto';
import { IDeleteTutorialDTO } from '@/@module/domain/DTO/tutorial/delete.dto';
import { IFilterTutorialsByAuthorDTO } from '@/@module/domain/DTO/tutorial/filter/by/author.dto';
import { IFilterTutorialsByContentDTO } from '@/@module/domain/DTO/tutorial/filter/by/content.dto';
import { IFilterTutorialsByTitleDTO } from '@/@module/domain/DTO/tutorial/filter/by/title.dto';
import { IListAllTutorialsDTO } from '@/@module/domain/DTO/tutorial/list/all.dto';
import { ITutorialDTO } from '@/@module/domain/DTO/tutorial/tutorial.dto';
import { IUpdateTutorialDTO } from '@/@module/domain/DTO/tutorial/update.dto';
import { Tutorial } from '@/@module/domain/entity/tutorial.entity';
import { ITutorialGateway } from '@/@module/domain/gateway/tutorial/tutorial.gateway';
import { injectConfig } from '@/@module/infra/config/config.module';
import { injectEngine } from '@/@module/infra/engine/engine.module';
import { AxiosHttpGateway } from '@/@module/infra/engine/gateway/http/axios/axios.gateway';
import { GlobalSession } from '@/global/session.global';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { injectable } from 'inversify';

@injectable()
export class AxiosHttpTutorialGateway implements ITutorialGateway {
  @injectEngine(MODULE.INFRA.ENGINE.GATEWAY.HTTP.AXIOS)
  private readonly engine!: AxiosHttpGateway;
  @injectConfig(MODULE.INFRA.CONFIG.API.URL)
  private readonly baseApiUrl!: string;

  private readonly api_url = `${this.baseApiUrl}/tutorial`;
  private readonly header = {
    headers: {
      Authorization: `Bearer ${GlobalSession.user?.authToken}`,
    },
  };

  async create(tutorial: ICreateTutorialDTO) {
    const response = await this.engine.post<ITutorialDTO>(
      `${this.api_url}`,
      tutorial,
      this.header,
    );

    return Tutorial.fromDTO(response.data);
  }

  async update(tutorial: IUpdateTutorialDTO) {
    return Tutorial.fromDTO(
      (
        await this.engine.put<ITutorialDTO>(
          `${this.api_url}/${tutorial.id}`,
          tutorial,
          this.header,
        )
      ).data,
    );
  }

  async delete(tutorial: IDeleteTutorialDTO) {
    return (
      (await this.engine.delete(`${this.api_url}/${tutorial.id}`, this.header))
        .status === 200
    );
  }

  async listAll({ pagination: { limit, page } }: IListAllTutorialsDTO) {
    const response = (
      await this.engine.get(
        `${this.api_url}?page=${page}&limit=${limit}`,
        this.header,
      )
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
        this.header,
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
        this.header,
      )
    ).data as IPaginationOutputDTO<ITutorialDTO>;

    return {
      ...response,
      items: response.items.map(Tutorial.fromDTO),
    } as IPaginationOutputDTO<Tutorial>;
  }

  async findByKeywordInContent({ keyword }: IFilterTutorialsByContentDTO) {
    const response = (
      await this.engine.get(
        `${this.api_url}/content?keyword=${keyword}`,
        this.header,
      )
    ).data as IPaginationOutputDTO<ITutorialDTO>;

    return {
      ...response,
      items: response.items.map(Tutorial.fromDTO),
    } as IPaginationOutputDTO<Tutorial>;
  }
}
