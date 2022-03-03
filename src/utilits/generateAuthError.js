export default function generateAuthError(error) {
  switch (error) {
    case 'INVALID_PASSWORD': {
      return 'Почта или пароль введены неверно';
    }
    case 'EMAIL_NOT_FOUND': {
      return 'Почта или пароль введены неверно';
    }
    case 'EMAIL_EXISTS': {
      return 'Пользователь с такой почтой уже существует';
    }
    case 'INVALID_EMAIL': {
      return 'Неверная почта';
    }
    default: {
      return 'Слишком много попыток входа. Попробуйте позже';
    }
  }
}
