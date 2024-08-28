import { inject, injectable } from 'inversify';
import { ICMSGateway } from '../../../../infra/engine/gateway/cms/cms.gateway';
import { MODULE } from '@/@module/app.registry';
import { IGetFromCMSDTO } from '@/@module/domain/DTO/infra/engine/cms/get.dto';
import { SanityClient } from 'sanity';

@injectable()
export class SanityCMSGateway implements ICMSGateway {
  constructor(
    @inject(MODULE.INFRA.ENGINE.GATEWAY.CMS.SANITY)
    private readonly engine: SanityClient,
  ) {}

  async getString({ id }: IGetFromCMSDTO) {
    const query = `*[_type == "paragraph" && identifier == $identifier][0]{ body }`;
    const params = { identifier: id };
    const result = await this.engine.fetch(query, params);
    console.log({ result });
    return result.body;
  }
  async getImage({ id }: IGetFromCMSDTO) {
    const query = `*[_type == "imageWithIdentifier" && identifier == $identifier][0]{ "imageUrl": image.asset->url }`;
    const result = await this.engine.fetch(query, { identifier: id });
    console.log({ result });
    return result.imageUrl;
  }
}
