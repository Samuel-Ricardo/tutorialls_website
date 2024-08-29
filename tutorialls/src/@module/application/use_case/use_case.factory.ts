import { USE_CASE_MODULE } from './use_case.module';
import { USE_CASE_REGISTRY } from './use_case.registry';
import { LoginUserUseCase } from './user/login.use_case';
import { DecodeUserUseCase } from './user/security/decode.use_case';
import { SignupUserUseCase } from './user/signup.use_case';

export const USE_CASE_FACTORY = {
  USER: {
    LOGIN: () =>
      USE_CASE_MODULE.get<LoginUserUseCase>(USE_CASE_REGISTRY.USER.LOGIN),
    SIGNUP: () =>
      USE_CASE_MODULE.get<SignupUserUseCase>(USE_CASE_REGISTRY.USER.SIGNUP),
    SECURITY: {
      DECODE: () =>
        USE_CASE_MODULE.get<DecodeUserUseCase>(
          USE_CASE_REGISTRY.USER.SECURITY.DECODE,
        ),
    },
  },
};
