import { MODULE } from '@/@module/app.registry';
import { ICreateTutorialDTO } from '@/@module/domain/DTO/tutorial/create.dto';
import { IDeleteTutorialDTO } from '@/@module/domain/DTO/tutorial/delete.dto';
import { IFilterTutorialsByAuthorDTO } from '@/@module/domain/DTO/tutorial/filter/by/author.dto';
import { IFilterTutorialsByContentDTO } from '@/@module/domain/DTO/tutorial/filter/by/content.dto';
import { IFilterTutorialsByTitleDTO } from '@/@module/domain/DTO/tutorial/filter/by/title.dto';
import { IListAllTutorialsDTO } from '@/@module/domain/DTO/tutorial/list/all.dto';
import { IUpdateTutorialDTO } from '@/@module/domain/DTO/tutorial/update.dto';
import type { ITutorialService } from '@/@module/domain/service/tutorial/tutorial.service';
import { inject, injectable } from 'inversify';

@injectable()
export class TutorialController {
  constructor(
    @inject(MODULE.APPLICATION.SERVICE.TUTORIAL)
    private readonly service: ITutorialService,
  ) {}

  async create(tutorial: ICreateTutorialDTO) {
    return (await this.service.create(tutorial)).toDTO();
  }

  async update(tutorial: IUpdateTutorialDTO) {
    return (await this.service.update(tutorial)).toDTO();
  }

  async delete(tutorial: IDeleteTutorialDTO) {
    return await this.service.delete(tutorial);
  }

  async listAll(DTO: IListAllTutorialsDTO) {
    const result = await this.service.listAll(DTO);
    return {
      ...result,
      items: result.items.map(tutorial => tutorial.toDTO()),
    };
  }

  async filterByTitle(DTO: IFilterTutorialsByTitleDTO) {
    const result = await this.service.filterByTitle(DTO);
    return {
      ...result,
      items: result.items.map(tutorial => tutorial.toDTO()),
    };
  }

  async filterByAuthor(DTO: IFilterTutorialsByAuthorDTO) {
    const result = await this.service.filterByAuthor(DTO);
    return {
      ...result,
      items: result.items.map(tutorial => tutorial.toDTO()),
    };
  }

  async filterByKeywordInContent(DTO: IFilterTutorialsByContentDTO) {
    const result = await this.service.filterByKeywordInContent(DTO);
    return {
      ...result,
      items: result.items.map(tutorial => tutorial.toDTO()),
    };
  }
}
