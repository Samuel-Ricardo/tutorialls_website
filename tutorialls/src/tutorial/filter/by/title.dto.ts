import { PaginationDTO } from '@/pagination/pagination.dto';

export interface IFilterTutorialsByTitleDTO extends PaginationDTO {
  title: string;
}
