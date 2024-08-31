import { IUserDTO } from '@/@module/domain/DTO/user.dto';

export class GlobalSession {
  private static _globalUser: IUserDTO | undefined = undefined;

  static get user(): IUserDTO | undefined {
    return this._globalUser;
  }

  static set user(data: IUserDTO | undefined) {
    this._globalUser = data;
  }
}
