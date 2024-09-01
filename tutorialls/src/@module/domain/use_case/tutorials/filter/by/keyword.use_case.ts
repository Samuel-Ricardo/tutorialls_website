import { IFilterTutorialsByContentDTO } from '@/@module/domain/DTO/tutorial/filter/by/content.dto';
import { Tutorial } from '@/@module/domain/entity/tutorial.entity';
import { IPaginationOutputDTO } from '@/pagination/output.dto';

export interface IFilterTutorialsByKeywordUseCase {
  execute(
    DTO: IFilterTutorialsByContentDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>>;
}
