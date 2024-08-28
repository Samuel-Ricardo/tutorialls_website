import { MODULE } from '@/@module/app.registry';
import { IUserDTO } from '@/@module/domain/DTO/user.dto';
import { IDecodeUserDTO } from '@/@module/domain/DTO/user/decode.dto';
import { IDecodeUserUseCase } from '@/@module/domain/use_case/user/security/decode.use_case';
import { injectConfig } from '@/@module/infra/config/config.module';
import { injectEngine } from '@/@module/infra/engine/engine.module';
import type { JWT } from '@/@type/module/infra/engine/auth/jwt.type';
import { injectable } from 'inversify';
import { JwtPayload } from 'jsonwebtoken';

@injectable()
export class DecodeUserUseCase implements IDecodeUserUseCase {
  @injectEngine(MODULE.INFRA.ENGINE.AUTH.JWT)
  private readonly engine!: JWT;

  @injectConfig(MODULE.INFRA.CONFIG.JWT.SECRET)
  private readonly secret!: string;

  async execute({ token }: IDecodeUserDTO): Promise<IUserDTO> {
    const result = this.engine.verify(token, this.secret) as JwtPayload;

    return {
      id: result.id,
      email: result.email,
      password: result.password,
      authToken: token,
    };
  }
}
