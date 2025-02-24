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
            case 'EMAIL_EXIST':
                return 'Email already exists';
            case 'EMAIL_NOT_FOUND':
                return 'Email not found';
            case 'INVALID_PASSWORD':
                return 'Invalid password';
            default:
                return 'Unexpected error, please try again';
        }
    }
}