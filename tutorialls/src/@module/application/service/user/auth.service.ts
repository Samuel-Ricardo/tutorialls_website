import { MODULE } from '@/@module/app.registry';
import { IDecodeUserDTO } from '@/@module/domain/DTO/user/decode.dto';
import { ILoginUserDTO } from '@/@module/domain/DTO/user/login.dto';
import { ISignupUserDTO } from '@/@module/domain/DTO/user/signup.dto';
import { IAuthService } from '@/@module/domain/service/user/auth.service';
import type { ILoginUserUseCase } from '@/@module/domain/use_case/user/login.use_case';
import type { IDecodeUserUseCase } from '@/@module/domain/use_case/user/security/decode.use_case';
import type { ISignupUserUseCase } from '@/@module/domain/use_case/user/signup.use_case';
import { inject, injectable } from 'inversify';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(MODULE.APPLICATION.USE_CASE.USER.LOGIN)
    private readonly loginUser: ILoginUserUseCase,
    @inject(MODULE.APPLICATION.USE_CASE.USER.SIGNUP)
    private readonly signupUser: ISignupUserUseCase,
    @inject(MODULE.APPLICATION.USE_CASE.USER.SECURITY.DECODE)
    private readonly decodeUser: IDecodeUserUseCase,
  ) {}

  async login(user: ILoginUserDTO) {
    return await this.loginUser.execute(user);
  }

  async signup(user: ISignupUserDTO) {
    return await this.signupUser.execute(user);
  }

  async decode({ token }: IDecodeUserDTO) {
    return await this.decodeUser.execute({ token });
  }
}
