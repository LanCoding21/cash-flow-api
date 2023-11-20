interface IRegisterUserPayload {
  email: string;
  password: string;
  fullName: string;
}

export default class RegisterUser {
  email: string;

  password: string;

  fullName: string;

  constructor(payload: IRegisterUserPayload) {
    this.verifyPayload(payload);

    this.email = payload.email;
    this.password = payload.password;
    this.fullName = payload.fullName;
  }

  verifyPayload(payload: IRegisterUserPayload) {
    const { email, fullName, password } = payload;

    if (!email || !fullName || !password) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (password.length < 8) {
      throw new Error('REGISTER_USER.PASSWORD_MINIMUM_CHARACTER');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('REGISTER_USER.EMAIL_NOT_VALID');
    }
  }
}
