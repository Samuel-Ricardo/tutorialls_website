import { Container } from 'inversify';
import { USE_CASE_REGISTRY } from './use_case.registry';
import { LoginUserUseCase } from './user/login.use_case';
import { SignupUserUseCase } from './user/signup.use_case';
import { DecodeUserUseCase } from './user/security/decode.use_case';
import { CreateTutorialUseCase } from './tutorial/create.use_case';
import { UpdateTutorialUseCase } from './tutorial/update.uce_case';
import { DeleteTutorialUseCase } from './tutorial/delete.use_case';
import { ListAllTutorialsUseCase } from './tutorial/list/all.use_case';
import { FilterTutorialByTitleUseCase } from './tutorial/filter/by/title.use_case';
import { FilterTutorialByKeywordUseCase } from './tutorial/filter/by/keyword.use_case';
import { FilterTutorialByAuthorUseCase } from './tutorial/filter/by/author.use_case';

export const USE_CASE_MODULE = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

USE_CASE_MODULE.bind(USE_CASE_REGISTRY.USER.LOGIN).to(LoginUserUseCase);
USE_CASE_MODULE.bind(USE_CASE_REGISTRY.USER.SIGNUP).to(SignupUserUseCase);
USE_CASE_MODULE.bind(USE_CASE_REGISTRY.USER.SECURITY.DECODE).to(
  DecodeUserUseCase,
);

USE_CASE_MODULE.bind(USE_CASE_REGISTRY.TUTORIAL.CREATE).to(
  CreateTutorialUseCase,
);
USE_CASE_MODULE.bind(USE_CASE_REGISTRY.TUTORIAL.UPDATE).to(
  UpdateTutorialUseCase,
);
USE_CASE_MODULE.bind(USE_CASE_REGISTRY.TUTORIAL.DELETE).to(
  DeleteTutorialUseCase,
);

USE_CASE_MODULE.bind(USE_CASE_REGISTRY.TUTORIAL.LIST.ALL).to(
  ListAllTutorialsUseCase,
);

USE_CASE_MODULE.bind(USE_CASE_REGISTRY.TUTORIAL.FILTER.BY.TITLE).to(
  FilterTutorialByTitleUseCase,
);
USE_CASE_MODULE.bind(USE_CASE_REGISTRY.TUTORIAL.FILTER.BY.CONTENT).to(
  FilterTutorialByKeywordUseCase,
);
USE_CASE_MODULE.bind(USE_CASE_REGISTRY.TUTORIAL.FILTER.BY.AUTHOR).to(
  FilterTutorialByAuthorUseCase,
);
