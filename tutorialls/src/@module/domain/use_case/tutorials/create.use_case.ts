import { ICreateTutorialDTO } from '../../DTO/tutorial/create.dto';
import { Tutorial } from '../../entity/tutorial.entity';

export interface ICreateTutorialUseCase {
  execute(tutorial: ICreateTutorialDTO): Promise<Tutorial>;
}
