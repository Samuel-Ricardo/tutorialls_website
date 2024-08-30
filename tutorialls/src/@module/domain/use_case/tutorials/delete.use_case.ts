import { IDeleteTutorialDTO } from '@/tutorial/delete.dto';

export interface IDeleteTutorialUseCase {
  execute(tutorial: IDeleteTutorialDTO): Promise<boolean>;
}
