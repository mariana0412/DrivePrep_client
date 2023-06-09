export const passwordLengthIsValid = (password) => password.length >= 8;
export const repeatPasswordIsEqualToPassword = (password, repeatPassword) => password === repeatPassword;
export const oldAndNewPasswordsAreDifferent = (oldPassword, newPassword) => oldPassword !== newPassword;

export const nameAndSurnameAreNotEmpty = (name, surname) => name.trim() !== '' && surname.trim() !== '';

export const emailFormatIsValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const emailIsRu = (email) => {
    const ruRegex = /.ru$/;
    return ruRegex.test(email);
}
