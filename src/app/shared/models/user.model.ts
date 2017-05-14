import {BaseModel} from './base.model';

export class UserInfo extends BaseModel {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUrl?: string;

  constructor() {
    super();
    this.id = undefined;
    this.username = undefined;
    this.email = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.phoneNumber = undefined;
    this.avatarUrl = undefined;
  }
}

export class UserToken {
  accessToken: string;
  refreshToken: string;

  constructor() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
  }
}
