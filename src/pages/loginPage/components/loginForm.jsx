/* eslint-disable no-useless-return */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import TextField from '../../../sharedComponents/form/textField';
import CheckBoxField from '../../../sharedComponents/form/checkBoxField';
import { useAuth } from '../../../hooks/useAuth';

const LoginForm = () => {
  const history = useHistory();
  const { logIn } = useAuth();
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});
  const validateScheme = yup.object().shape({
    password: yup.string().required('Пароль обязателен для заполнения'),
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Электронная почта введена некорректно'),
  });
  const handleChange = target => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }));
  };
  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch(err => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isDisable = Object.keys(errors).length === 0;
  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await logIn(data);
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  return (
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button type="submit" className="btn btn-primary w-100 mx-auto" disabled={!isDisable}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
