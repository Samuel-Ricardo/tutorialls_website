import { ICreateTutorialDTO } from '@/tutorial/create.dto';
import { Tutorial } from '../../entity/tutorial.entity';

export interface ICreateTutorialUseCase {
  execute(tutorial: ICreateTutorialDTO): Promise<Tutorial>;
}
