import { IDeleteTutorialDTO } from '../../DTO/tutorial/delete.dto';

export interface IDeleteTutorialUseCase {
  execute(tutorial: IDeleteTutorialDTO): Promise<boolean>;
}
