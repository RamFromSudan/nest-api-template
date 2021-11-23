export class LoginResDto {
  public readonly accessToken: string;

  constructor(required: Required<LoginResDto>) {
    Object.assign(this, required);
  }
}
