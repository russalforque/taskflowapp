import Validations from "./Validations";

export default class SignupValidations {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    checkValidations() {
        let err = {};

        if (!Validations.checkEmail(this.email)) {
            err['email'] = 'Invalid Email';
        }

        if (!Validations.minLength(this.password, 6)) {
            err['password'] = 'password should be of 6 characters';
        }

        return err;
    }

    static getErrorMessageFromCode(errorCode) {
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            case 'EMAIL_NOT_FOUND':
                return 'Email not found';
            case 'INVALID_PASSWORD':
                return 'Invalid password';
            case 'INVALID_EMAIL':
                return 'Invalid email format';
            case 'WEAK_PASSWORD':
                return 'Password should be at least 6 characters';
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return 'Too many attempts, please try again later';
            default:
                return 'Unexpected error, please try again';
        }
    }
}