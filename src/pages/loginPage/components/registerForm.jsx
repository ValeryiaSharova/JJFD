/* eslint-disable no-useless-return */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '../../../sharedComponents/form/textField';
import SelectField from '../../../sharedComponents/form/selectField';
import RadioField from '../../../sharedComponents/form/radioField';
import MultiSelectField from '../../../sharedComponents/form/multiSelectField';
import CheckBoxField from '../../../sharedComponents/form/checkBoxField';
import { getQualities } from '../../../store/qualities';
import { getProfessions } from '../../../store/profession';

import { getAuthErrors, signUp } from '../../../store/users';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'Мужской',
    name: '',
    qualities: [],
    licence: false,
  });
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualities());
  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
  const loginError = useSelector(getAuthErrors());
  const [errors, setErrors] = useState({});

  const handleChange = target => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }));
  };
  const validateScheme = yup.object().shape({
    licence: yup
      .bool()
      .oneOf(
        [true],
        'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
      ),
    qualities: yup.array().min(1, 'Выберите хотя бы одно свое качество'),
    profession: yup.string().required('Обязательно выберите вашу профессию'),
    password: yup
      .string()
      .required('Пароль обязателен для заполнения')
      .matches(/(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
      .matches(/(?=.*[!@#$%^&*])/, 'Пароль должен содержать хотя бы один специальный символ')
      .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
    name: yup
      .string()
      .required('Имя обязательно для заполнения')
      .min(3, 'Имя должно состоять минимум из трех символов'),
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Электронная почта введена некорректно'),
  });

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch(err => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map(q => q.value) };
    dispatch(signUp(newData));
  };
  useEffect(() => {
    validate();
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выберите вашу профессию"
        defaultOption="Choose..."
        options={professions}
        name="profession"
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: 'Женский', value: 'Женский' },
          { name: 'Мужской', value: 'Мужской' },
          { name: 'Другой', value: 'Другой' },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
        error={errors.qualities}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button type="submit" className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
