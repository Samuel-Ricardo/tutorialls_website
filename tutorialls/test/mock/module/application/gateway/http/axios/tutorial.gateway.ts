import { AxiosHttpTutorialGateway } from '@/@module/application/gateway/http/axios/tutorial/tutorial.gateway';
import { interfaces } from 'inversify';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ISimulatedTutorialGateway } from '../../../../../../@types/domain/gateway/tutorial.type';
import { MOCKED_MODULE } from '../../../../app.registry';
import { AxiosHttpGateway } from '@/@module/infra/engine/gateway/http/axios/axios.gateway';

export const mockAxiosHttpTutorialGateway = () =>
  mockDeep<AxiosHttpTutorialGateway>();

export const simulateAxiosHttpTutorialsGateway = ({
  container,
}: interfaces.Context): ISimulatedTutorialGateway<
  AxiosHttpTutorialGateway,
  AxiosHttpGateway
> => {
  const engine = container.get<DeepMockProxy<AxiosHttpGateway>>(
    MOCKED_MODULE.INFRA.ENGINE.GATEWAY.HTTP.AXIOS.MOCKED,
  );

  return {
    gateway: new AxiosHttpTutorialGateway(),
    engine,
  };
};
