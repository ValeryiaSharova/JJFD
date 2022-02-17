/* eslint-disable no-useless-return */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const CommentForm = ({ onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});

  const validateScheme = yup.object().shape({
    content: yup.string().required('Введите текст комментария'),
  });

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
    setData({});
    setErrors({});
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>Новый комментарий</h2>
          <div className="mb-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Сообщение
            </label>
            <div className="input-group has-validation">
              <textarea
                className={getInputClassesForTextArea()}
                id="content"
                name="content"
                value={data.content || ''}
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
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
