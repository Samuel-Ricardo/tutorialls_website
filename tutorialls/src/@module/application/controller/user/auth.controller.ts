import { MODULE } from '@/@module/app.registry';
import { IDecodeUserDTO } from '@/@module/domain/DTO/user/decode.dto';
import { ILoginUserDTO } from '@/@module/domain/DTO/user/login.dto';
import { ISignupUserDTO } from '@/@module/domain/DTO/user/signup.dto';
import type { IAuthService } from '@/@module/domain/service/user/auth.service';
import { inject, injectable } from 'inversify';

@injectable()
export class AuthController {
  constructor(
    @inject(MODULE.APPLICATION.SERVICE.USER.AUTH)
    private readonly authService: IAuthService,
  ) {}

  async signup(user: ISignupUserDTO) {
    return { success: await this.authService.signup(user) };
  }

  async login(user: ILoginUserDTO) {
    return { token: await this.authService.login(user) };
  }

  async decode(user: IDecodeUserDTO) {
    return { user: await this.authService.decode(user) };
  }
}
