export default class Validations {
    static checkEmail(email) {
        return /^[\w.+-]+@\w+([.-]?\w+)*\.\w{2,3}$/.test(email);
    }

    static minLength(name, minLength) {
        return name.length >= minLength; // ✅ Corrected length check
    }
}
