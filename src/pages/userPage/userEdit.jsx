import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import api from '../../api/index';
import TextField from '../../sharedComponents/form/textField';
import SelectField from '../../sharedComponents/form/selectField';
import RadioField from '../../sharedComponents/form/radioField';
import MultiSelectField from '../../sharedComponents/form/multiSelectField';

const UserEdit = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.getById(userId).then(data => {
      const updateData = Object.keys(data).reduce((prev, field) => {
        if (field === 'qualities') {
          prev[field] = [
            ...data[field].map(qualitie => ({ label: qualitie.name, value: qualitie._id })),
          ];
        } else if (field === 'profession') {
          prev[field] = data[field]._id;
        } else {
          prev[field] = data[field];
        }
        return prev;
      }, {});
      setUser(updateData);
    });
    api.professions.fetchAll().then(data => {
      setProfessions(data);
    });
    api.qualities.fetchAll().then(data => {
      setQualities(data);
    });
  }, []);

  const handleChange = target => {
    setUser(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const validateScheme = yup.object().shape({
    qualities: yup.array().min(1, 'Выберите хотя бы одно свое качество'),
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Электронная почта введена некорректно'),
    name: yup.string().required('Имя обязательно для заполнения'),
  });

  const validate = () => {
    validateScheme
      .validate(user)
      .then(() => setErrors({}))
      .catch(err => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = e => {
    e.preventDefault();
    const updateData = Object.keys(user).reduce((prev, field) => {
      if (field === 'qualities') {
        prev[field] = [
          ...user.qualities.reduce((prev, elem) => {
            Object.keys(qualities).forEach(key => {
              if (qualities[key]._id === elem.value) {
                prev.push(qualities[key]);
              }
            });
            return prev;
          }, []),
        ];
      } else if (field === 'profession') {
        prev[field] = professions.reduce((prev, profession) => {
          if (profession._id === user.profession) prev = { ...profession };
          return prev;
        }, {});
      } else {
        prev[field] = user[field];
      }
      return prev;
    }, {});
    api.users.update(user._id, updateData);
    history.push(`/users/${userId}`);
  };
  useEffect(() => {
    validate();
  }, [user]);
  return (
    <>
      {user && professions ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Имя"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="Электронная почта"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Выберите вашу профессию"
                  defaultOption="Choose..."
                  options={professions}
                  name="profession"
                  onChange={handleChange}
                  value={user.profession}
                />
                <RadioField
                  options={[
                    { name: 'Женский', value: 'Женский' },
                    { name: 'Мужской', value: 'Мужской' },
                    { name: 'Другой', value: 'Другой' },
                  ]}
                  value={user.sex}
                  name="sex"
                  onChange={handleChange}
                  label="Выберите ваш пол"
                />
                <MultiSelectField
                  options={qualities}
                  onChange={handleChange}
                  defaultValue={user.qualities}
                  name="qualities"
                  label="Выберите ваши качества"
                  error={errors.qualities}
                />
                <button type="submit" className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
                  Сохранить
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </>
  );
};

export default UserEdit;
