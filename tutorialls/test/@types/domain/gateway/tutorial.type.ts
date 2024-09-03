import { ITutorialGateway } from '@/@module/domain/gateway/tutorial/tutorial.gateway';
import { DeepMockProxy } from 'jest-mock-extended';

export interface ISimulatedTutorialGateway<G extends ITutorialGateway, C> {
  gateway: G;
  engine: DeepMockProxy<C>;
}
