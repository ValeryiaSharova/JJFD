/* eslint-disable no-useless-return */
import React, { useState, useEffect } from 'react';
import TextField from '../../../sharedComponents/textField';
import { validator } from '../../../utilits/validator';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Электронная почта введена некорректно' },
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol: { message: 'Пароль должен содержать хотя бы одну заглавную букву' },
      isContainDigit: { message: 'Пароль должен содержать хотя бы одну цифру' },
      min: { message: 'Пароль должен состоять минимум из 8 символов', value: 8 },
    },
  };
  const handleChange = ({ target }) => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }));
  };
  const validate = () => {
    const newErrors = validator(data, validatorConfig);
    setErrors(newErrors);
    return Object.keys(errors).length === 0;
  };
  const isDisable = Object.keys(errors).length === 0;
  const handleSubmit = e => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
  };
  useEffect(() => {
    validate();
  }, [data]);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Вход</h3>
          <form className="" onSubmit={handleSubmit}>
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Пароль"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button type="submit" className="btn btn-primary w-100 mx-auto" disabled={!isDisable}>
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
