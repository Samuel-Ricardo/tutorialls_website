import { Tutorial } from '@/@module/domain/entity/tutorial.entity';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { IFilterTutorialsByTitleDTO } from '@/tutorial/filter/by/title.dto';

export interface IFilterTutorialsByTitleUseCase {
  execute(
    DTO: IFilterTutorialsByTitleDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>>;
}
