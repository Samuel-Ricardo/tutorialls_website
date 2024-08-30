import { Tutorial } from '@/@module/domain/entity/tutorial.entity';
import { IPaginationOutputDTO } from '@/pagination/output.dto';
import { IListAllTutorialsDTO } from '@/tutorial/list/all.dto';

export interface IListAllTutorialsUseCase {
  execute(DTO: IListAllTutorialsDTO): Promise<IPaginationOutputDTO<Tutorial>>;
}
