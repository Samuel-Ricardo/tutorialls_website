import { MODULE } from '@/@module/app.registry';
import { ICreateTutorialDTO } from '@/@module/domain/DTO/tutorial/create.dto';
import { IDeleteTutorialDTO } from '@/@module/domain/DTO/tutorial/delete.dto';
import { IFilterTutorialsByAuthorDTO } from '@/@module/domain/DTO/tutorial/filter/by/author.dto';
import { IFilterTutorialsByContentDTO } from '@/@module/domain/DTO/tutorial/filter/by/content.dto';
import { IListAllTutorialsDTO } from '@/@module/domain/DTO/tutorial/list/all.dto';
import { IUpdateTutorialDTO } from '@/@module/domain/DTO/tutorial/update.dto';
import type { ITutorialService } from '@/@module/domain/service/tutorial/tutorial.service';
import { IFilterTutorialsByTitleUseCase } from '@/@module/domain/use_case/tutorials/filter/by/title.use_case';
import { inject, injectable } from 'inversify';

@injectable()
export class TutorialController {
  constructor(
    @inject(MODULE.APPLICATION.SERVICE.TUTORIAL)
    private readonly service: ITutorialService,
  ) {}

  async create(tutorial: ICreateTutorialDTO) {
    return await this.service.create(tutorial);
  }

  async update(tutorial: IUpdateTutorialDTO) {
    return await this.service.update(tutorial);
  }

  async delete(tutorial: IDeleteTutorialDTO) {
    return await this.service.delete(tutorial);
  }

  async listAll(DTO: IListAllTutorialsDTO) {
    return await this.service.listAll(DTO);
  }

  async filterByTitle(DTO: IFilterTutorialsByTitleUseCase) {
    return await this.service.filterByTitle(DTO);
  }

  async filterByAuthor(DTO: IFilterTutorialsByAuthorDTO) {
    return await this.service.filterByAuthor(DTO);
  }

  async filterByKeywordInContent(DTO: IFilterTutorialsByContentDTO) {
    return await this.service.filterByKeywordInContent(DTO);
  }
}
