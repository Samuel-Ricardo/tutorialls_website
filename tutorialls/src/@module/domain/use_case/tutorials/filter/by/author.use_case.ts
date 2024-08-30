import { Tutorial } from '@/@module/domain/entity/tutorial.entity';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { IFilterTutorialsByAuthorDTO } from '@/tutorial/filter/by/author.dto';

export interface IFilterTutorialsByAuthorUseCase {
  execute(
    DTO: IFilterTutorialsByAuthorDTO,
  ): Promise<IPaginationOutputDTO<Tutorial>>;
}
