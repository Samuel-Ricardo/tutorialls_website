import { PaginationDTO } from '@/pagination/pagination.dto';

export interface IFilterTutorialsByContentDTO extends PaginationDTO {
  keyword: string;
}
