/* eslint-disable no-useless-return */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import TextField from '../../../sharedComponents/form/textField';
import api from '../../../api/index';
import SelectField from '../../../sharedComponents/form/selectField';
import RadioField from '../../../sharedComponents/form/radioField';
import MultiSelectField from '../../../sharedComponents/form/multiSelectField';
import CheckBoxField from '../../../sharedComponents/form/checkBoxField';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'Мужской',
    qualities: [],
    licence: false,
  });
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});
  const [qualities, setQualities] = useState({});
  useEffect(() => {
    api.professions.fetchAll().then(data => {
      setProfessions(data);
    });
    api.qualities.fetchAll().then(data => {
      setQualities(data);
    });
  }, []);
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
  const handleSubmit = e => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
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
        options={qualities}
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
      <button type="submit" className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
