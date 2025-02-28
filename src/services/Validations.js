export default class Validations {
    static checkEmail(email) {
        if (!email) return false;
        
        // Gmail-specific validation regex
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
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
