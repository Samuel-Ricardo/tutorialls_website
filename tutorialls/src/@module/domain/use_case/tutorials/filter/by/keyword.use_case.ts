import { Tutorial } from '@/@module/domain/entity/tutorial.entity';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { IFilterTutorialsByContentDTO } from '@/tutorial/filter/by/content.dto';

export interface IFilterTutorialsByKeywordUseCase {
  execute(
    DTO: IFilterTutorialsByContentDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>>;
}
