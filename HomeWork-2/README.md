# alex_gen-pass
пример использования: 

const PasswordGenerator = require('./PasswordGenerator');

const password = PasswordGenerator(10, true, true, false);
console.log(password);

Установите длинну пароля с помощью аргумента length;
Если нужно добовляем буквы с помощью аргумента useLetters и ставим true;
Если нужно добовляем числа с помощью аргумента useNumbers и ставим true;
Если нужно добовляем символы с помощью аргумента useSymbols и ставим true;
