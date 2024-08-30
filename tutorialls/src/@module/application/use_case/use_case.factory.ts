import { CreateTutorialUseCase } from './tutorial/create.use_case';
import { DeleteTutorialUseCase } from './tutorial/delete.use_case';
import { FilterTutorialByAuthorUseCase } from './tutorial/filter/by/author.use_case';
import { FilterTutorialByKeywordUseCase } from './tutorial/filter/by/keyword.use_case';
import { FilterTutorialByTitleUseCase } from './tutorial/filter/by/title.use_case';
import { ListAllTutorialsUseCase } from './tutorial/list/all.use_case';
import { UpdateTutorialUseCase } from './tutorial/update.uce_case';
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
  TUTORIAL: {
    CREATE: () =>
      USE_CASE_MODULE.get<CreateTutorialUseCase>(
        USE_CASE_REGISTRY.TUTORIAL.CREATE,
      ),
    UPDATE: () =>
      USE_CASE_MODULE.get<UpdateTutorialUseCase>(
        USE_CASE_REGISTRY.TUTORIAL.UPDATE,
      ),
    DELETE: () =>
      USE_CASE_MODULE.get<DeleteTutorialUseCase>(
        USE_CASE_REGISTRY.TUTORIAL.DELETE,
      ),
    LIST: {
      ALL: () =>
        USE_CASE_MODULE.get<ListAllTutorialsUseCase>(
          USE_CASE_REGISTRY.TUTORIAL.LIST.ALL,
        ),
    },
    FILTER: {
      BY: {
        TITLE: () =>
          USE_CASE_MODULE.get<FilterTutorialByTitleUseCase>(
            USE_CASE_REGISTRY.TUTORIAL.FILTER.BY.TITLE,
          ),
        CONTENT: () =>
          USE_CASE_MODULE.get<FilterTutorialByKeywordUseCase>(
            USE_CASE_REGISTRY.TUTORIAL.FILTER.BY.CONTENT,
          ),
        AUTHOR: () =>
          USE_CASE_MODULE.get<FilterTutorialByAuthorUseCase>(
            USE_CASE_REGISTRY.TUTORIAL.FILTER.BY.AUTHOR,
          ),
      },
    },
  },
};
