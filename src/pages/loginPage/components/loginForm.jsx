/* eslint-disable no-useless-return */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '../../../sharedComponents/form/textField';
import CheckBoxField from '../../../sharedComponents/form/checkBoxField';
import { getAuthErrors, login } from '../../../store/users';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginError = useSelector(getAuthErrors());
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
  const handleSubmit = e => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state ? history.location.state.from.pathname : '/';
    dispatch(login({ ...data, redirect }));
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
      {loginError && <p className="text-danger">{loginError}</p>}
      <button type="submit" className="btn btn-primary w-100 mx-auto" disabled={!isDisable}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
