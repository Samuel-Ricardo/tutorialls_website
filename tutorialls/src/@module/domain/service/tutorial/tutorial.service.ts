import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { ICreateTutorialDTO } from '../../DTO/tutorial/create.dto';
import { IDeleteTutorialDTO } from '../../DTO/tutorial/delete.dto';
import { IFilterTutorialsByAuthorDTO } from '../../DTO/tutorial/filter/by/author.dto';
import { IFilterTutorialsByContentDTO } from '../../DTO/tutorial/filter/by/content.dto';
import { IFilterTutorialsByTitleDTO } from '../../DTO/tutorial/filter/by/title.dto';
import { IListAllTutorialsDTO } from '../../DTO/tutorial/list/all.dto';
import { IUpdateTutorialDTO } from '../../DTO/tutorial/update.dto';
import { Tutorial } from '../../entity/tutorial.entity';

export interface ITutorialService {
  create(tutorial: ICreateTutorialDTO): Promise<Tutorial>;
  update(tutorial: IUpdateTutorialDTO): Promise<Tutorial>;
  delete(tutorial: IDeleteTutorialDTO): Promise<boolean>;

  listAll(DTO: IListAllTutorialsDTO): Promise<IPaginationOutputDTO<Tutorial>>;
  filterByTitle(
    DTO: IFilterTutorialsByTitleDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>>;
  filterByAuthor(
    DTO: IFilterTutorialsByAuthorDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>>;
  filterByKeywordInContent(
    DTO: IFilterTutorialsByContentDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>>;
}
