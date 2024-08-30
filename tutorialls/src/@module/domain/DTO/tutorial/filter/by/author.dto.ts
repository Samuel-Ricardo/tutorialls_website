import { PaginationDTO } from '@/pagination/pagination.dto';

export interface IFilterTutorialsByAuthorDTO extends PaginationDTO {
  author: string;
}
