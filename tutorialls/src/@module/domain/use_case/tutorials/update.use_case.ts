import { IUpdateTutorialDTO } from '@/tutorial/update.dto';
import { Tutorial } from '../../entity/tutorial.entity';

export interface IUpdateTutorialUseCase {
  execute(tutorial: IUpdateTutorialDTO): Promise<Tutorial>;
}
