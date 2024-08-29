/*
 * @jest-environment node
 */

import 'reflect-metadata';

import { MODULES } from '@/@module/app.facotry';
import { ICMSGateway } from '@/@module/infra/engine/gateway/cms/cms.gateway';
import { SanityCMSGateway } from '@/@module/application/gateway/cms/sanity/sanity.gateway';
import { EXPECTED_SANITY_PARAGRAPH } from '../../../../../data/sanity.data';

describe('[INTEGRATION] | GATEWAY => [SANITY] | [CMS]', () => {
  let gateway: ICMSGateway;

  beforeAll(() => {
    gateway = MODULES.APPLICATION.GATEWAY.CMS.SANITY();

    expect(gateway).toBeDefined();
    expect(gateway).toBeInstanceOf(SanityCMSGateway);
  });

  test('should return a string', async () => {
    const result = await gateway.getString({
      id: '1',
    });

    expect(result).toEqual(EXPECTED_SANITY_PARAGRAPH);
  });
});
