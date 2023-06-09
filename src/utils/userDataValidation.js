export const passwordLengthIsValid = (password) => password.length >= 8;
export const repeatPasswordIsEqualToPassword = (password, repeatPassword) => password === repeatPassword;
export const oldAndNewPasswordsAreDifferent = (oldPassword, newPassword) => oldPassword !== newPassword;

export const emailIsValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const rusRegex = /.ru$/
    if (!emailRegex.test(email)) {
        alert("Будь-ласка, введіть коректну електронну адресу.");
        return false;
    }
    else if(rusRegex.test(email)){
        alert("Система не підтримує використання РОСІЙСЬКИХ поштових адрес");
        return false;
    }
    return true;
}
