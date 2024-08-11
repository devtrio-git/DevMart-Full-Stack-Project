const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Helpers {
    static validateEmail(email) {
        return emailRegex.test(email);
    }
    static validatePassword(password) {
        return password.length > 7;
    }
    static validateName(name) {
        return name.length > 2;
    }
    static priceFormatter(amount) {
        return new Intl.NumberFormat('es-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount)
    }
}