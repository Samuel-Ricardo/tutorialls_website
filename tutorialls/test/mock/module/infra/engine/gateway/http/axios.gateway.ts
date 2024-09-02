import { AxiosHttpGateway } from '@/@module/infra/engine/gateway/http/axios/axios.gateway';
import { mockDeep } from 'jest-mock-extended';

export const mockAxiosHttpGateway = () => mockDeep<AxiosHttpGateway>();
