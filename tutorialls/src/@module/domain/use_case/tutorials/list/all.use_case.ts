import { IListAllTutorialsDTO } from '@/@module/domain/DTO/tutorial/list/all.dto';
import { Tutorial } from '@/@module/domain/entity/tutorial.entity';
import { IPaginationOutputDTO } from '@/pagination/output.dto';

export interface IListAllTutorialsUseCase {
  execute(DTO: IListAllTutorialsDTO): Promise<IPaginationOutputDTO<Tutorial>>;
}
