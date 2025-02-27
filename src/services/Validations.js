export default class Validations {
    static checkEmail(email) {
        if (!email) return false;
        
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static minLength(str, length) {
        if (str === undefined || str === null) return false;
        return str.toString().trim().length >= length;
    }

    static maxLength(str, length) {
        if (str === undefined || str === null) return false;
        return str.toString().trim().length <= length;
    }
}
