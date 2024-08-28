import { inject, injectable } from 'inversify';
import { ICMSGateway } from '../../../../infra/engine/gateway/cms/cms.gateway';
import { type SANITY_CLIENT_TYPE } from '@/@type/module/infra/engine/gateway/cms/sanity.type';
import { MODULE } from '@/@module/app.registry';
import { IGetFromCMSDTO } from '@/@module/domain/DTO/infra/engine/cms/get.dto';

@injectable()
export class SanityCMSGateway implements ICMSGateway {
  constructor(
    @inject(MODULE.INFRA.ENGINE.GATEWAY.CMS.SANITY)
    private readonly engine: SANITY_CLIENT_TYPE,
  ) {}

  async getString(DTO: IGetFromCMSDTO) {
    return 'string';
  }
  async getImage(DTO: IGetFromCMSDTO) {
    return 'image';
  }
}
