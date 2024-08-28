import { Container } from 'inversify';
import { USE_CASE_REGISTRY } from './use_case.registry';
import { LoginUserUseCase } from './user/login.use_case';
import { SignupUserUseCase } from './user/signup.use_case';

export const USE_CASE_MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

USE_CASE_MODULE.bind(USE_CASE_REGISTRY.USER.LOGIN).to(LoginUserUseCase);
USE_CASE_MODULE.bind(USE_CASE_REGISTRY.USER.SIGNUP).to(SignupUserUseCase);
