import { MODULE } from '@/@module/app.registry';
import { ICreateTutorialDTO } from '@/@module/domain/DTO/tutorial/create.dto';
import { IDeleteTutorialDTO } from '@/@module/domain/DTO/tutorial/delete.dto';
import { IFilterTutorialsByAuthorDTO } from '@/@module/domain/DTO/tutorial/filter/by/author.dto';
import { IFilterTutorialsByContentDTO } from '@/@module/domain/DTO/tutorial/filter/by/content.dto';
import { IFilterTutorialsByTitleDTO } from '@/@module/domain/DTO/tutorial/filter/by/title.dto';
import { IListAllTutorialsDTO } from '@/@module/domain/DTO/tutorial/list/all.dto';
import { IUpdateTutorialDTO } from '@/@module/domain/DTO/tutorial/update.dto';
import type { ITutorialService } from '@/@module/domain/service/tutorial/tutorial.service';
import type { ICreateTutorialUseCase } from '@/@module/domain/use_case/tutorials/create.use_case';
import type { IDeleteTutorialUseCase } from '@/@module/domain/use_case/tutorials/delete.use_case';
import type { IFilterTutorialsByAuthorUseCase } from '@/@module/domain/use_case/tutorials/filter/by/author.use_case';
import type { IFilterTutorialsByKeywordUseCase } from '@/@module/domain/use_case/tutorials/filter/by/keyword.use_case';
import type { IFilterTutorialsByTitleUseCase } from '@/@module/domain/use_case/tutorials/filter/by/title.use_case';
import type { IListAllTutorialsUseCase } from '@/@module/domain/use_case/tutorials/list/all.use_case';
import type { IUpdateTutorialUseCase } from '@/@module/domain/use_case/tutorials/update.use_case';
import { inject, injectable } from 'inversify';

@injectable()
export class TutorialService implements ITutorialService {
  constructor(
    @inject(MODULE.APPLICATION.USE_CASE.TUTORIAL.CREATE)
    private readonly createTutorial: ICreateTutorialUseCase,
    @inject(MODULE.APPLICATION.USE_CASE.TUTORIAL.LIST.ALL)
    private readonly listAllTutorials: IListAllTutorialsUseCase,
    @inject(MODULE.APPLICATION.USE_CASE.TUTORIAL.FILTER.BY.TITLE)
    private readonly filterTutorialsByTitle: IFilterTutorialsByTitleUseCase,
    @inject(MODULE.APPLICATION.USE_CASE.TUTORIAL.FILTER.BY.AUTHOR)
    private readonly filterTutorialsByAuthor: IFilterTutorialsByAuthorUseCase,
    @inject(MODULE.APPLICATION.USE_CASE.TUTORIAL.FILTER.BY.CONTENT)
    private readonly filterTutorialsByContent: IFilterTutorialsByKeywordUseCase,
    @inject(MODULE.APPLICATION.USE_CASE.TUTORIAL.UPDATE)
    private readonly updateTutorial: IUpdateTutorialUseCase,
    @inject(MODULE.APPLICATION.USE_CASE.TUTORIAL.DELETE)
    private readonly deleteTutorial: IDeleteTutorialUseCase,
  ) {}

  async create(tutorial: ICreateTutorialDTO) {
    return await this.createTutorial.execute(tutorial);
  }

  async update(tutorial: IUpdateTutorialDTO) {
    return await this.updateTutorial.execute(tutorial);
  }

  async delete(tutorial: IDeleteTutorialDTO) {
    return await this.deleteTutorial.execute(tutorial);
  }

  async listAll(DTO: IListAllTutorialsDTO) {
    return await this.listAllTutorials.execute(DTO);
  }

  async filterByTitle(DTO: IFilterTutorialsByTitleDTO) {
    return await this.filterTutorialsByTitle.execute(DTO);
  }

  async filterByAuthor(DTO: IFilterTutorialsByAuthorDTO) {
    return await this.filterTutorialsByAuthor.execute(DTO);
  }

  async filterByKeywordInContent(DTO: IFilterTutorialsByContentDTO) {
    return await this.filterTutorialsByContent.execute(DTO);
  }
}
