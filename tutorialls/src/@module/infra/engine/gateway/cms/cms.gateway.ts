import { IGetFromCMSDTO } from '@/@module/domain/DTO/infra/engine/cms/get.dto';

export interface ICMSGateway {
  getString(DTO: IGetFromCMSDTO): Promise<string>;
  getImage(DTO: IGetFromCMSDTO): Promise<string>;
}
