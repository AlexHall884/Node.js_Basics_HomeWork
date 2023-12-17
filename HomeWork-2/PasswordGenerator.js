function PasswordGenerator(length = 8, useLetters = true, useNumbers = true, useSymbols = true) {
    let charset = '';
    let newPassword = '';
    // если нужно добовляем буквы
    if (useLetters) {
        charset += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    // если нужно добовляем числа
    if (useNumbers) {
        charset += '0123456789';
    }
    // если нужно добовляем знаки
    if (useSymbols) {
        charset += '!@#$%^&*()_-+=<>?/{}~';
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        newPassword += charset[randomIndex];
    }

    return newPassword;
}

module.exports = PasswordGenerator;
