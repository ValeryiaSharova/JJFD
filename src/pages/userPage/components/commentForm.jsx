/* eslint-disable no-useless-return */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import api from '../../../api/index';

const CommentForm = ({ onSubmit, pageId }) => {
  const [users, setUsers] = useState();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    userId: '',
    content: '',
    pageId,
  });

  const validateScheme = yup.object().shape({
    content: yup.string().required('Введите текст комментария'),
    userId: yup.string().required('Укажите, кто оставляет комментарий'),
  });

  const getInputClassesForSelect = () => {
    return `form-select${errors.userId ? ' is-invalid' : ''}`;
  };

  const getInputClassesForTextArea = () => {
    return `form-control${errors.content ? ' is-invalid' : ''}`;
  };

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch(err => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ target }) => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = () => {
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    setData({
      userId: '',
      content: '',
      pageId,
    });
  };

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
    validate();
  }, [data]);

  return users ? (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>Новый комментарий</h2>
          <div className="mb-4">
            <select
              className={getInputClassesForSelect()}
              id="userName"
              name="userId"
              value={data.userId}
              onChange={handleChange}
            >
              <option disabled value="">
                Выберите пользователя
              </option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Сообщение
            </label>
            <div className="input-group has-validation">
              <textarea
                className={getInputClassesForTextArea()}
                id="content"
                name="content"
                value={data.content}
                onChange={handleChange}
                rows="3"
              />
              {errors.content && <div className="invalid-feedback">{errors.content}</div>}
            </div>
          </div>
          <button className="btn btn-primary float-end" type="button" onClick={handleSubmit}>
            Опубликовать
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p>Загрузка...</p>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default CommentForm;
