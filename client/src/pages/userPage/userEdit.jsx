import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '../../sharedComponents/form/textField';
import SelectField from '../../sharedComponents/form/selectField';
import RadioField from '../../sharedComponents/form/radioField';
import MultiSelectField from '../../sharedComponents/form/multiSelectField';
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities';
import { getProfessions, getProfessionsLoadingStatus } from '../../store/profession';
import { getCurrentUserData, updateUserData } from '../../store/users';

const UserEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUserData());
  const [user, setUser] = useState();
  const [rightQualities, setRightQualities] = useState();
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!qualitiesLoading) {
      const updateData = Object.keys(currentUser).reduce((prev, field) => {
        if (field === 'qualities') {
          prev[field] = [
            ...currentUser[field].map(qualitie => ({
              label: qualities.find(q => q._id === qualitie).name,
              value: qualitie,
            })),
          ];
        } else {
          prev[field] = currentUser[field];
        }
        return prev;
      }, {});
      setUser(updateData);
      const rightQualities = qualities.map(q => ({ label: q.name, value: q._id }));
      setRightQualities(rightQualities);
    }
  }, [qualitiesLoading]);

  const handleChange = target => {
    setUser(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const handleBackClick = () => {
    history.push(`/users/${userId}`);
  };

  const validateScheme = yup.object().shape({
    qualities: yup.array().min(1, '???????????????? ???????? ???? ???????? ???????? ????????????????'),
    email: yup
      .string()
      .required('?????????????????????? ?????????? ?????????????????????? ?????? ????????????????????')
      .email('?????????????????????? ?????????? ?????????????? ??????????????????????'),
    name: yup.string().required('?????? ?????????????????????? ?????? ????????????????????'),
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
        prev[field] = [...user[field].map(q => q.value)];
      } else if (field === 'profession') {
        prev[field] = user[field];
      } else {
        prev[field] = user[field];
      }
      return prev;
    }, {});
    dispatch(updateUserData(updateData));
    history.push(`/users/${userId}`);
  };
  useEffect(() => {
    validate();
  }, [user]);
  return (
    <>
      {user && !professionsLoading && !qualitiesLoading ? (
        <div className="container mt-5">
          <button className="btn btn-primary mb-4" type="button" onClick={handleBackClick}>
            <i className="bi bi-arrow-left-square pe-2" />
            ??????????
          </button>
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <form onSubmit={handleSubmit}>
                <TextField
                  label="??????"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="?????????????????????? ??????????"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="???????????????? ???????? ??????????????????"
                  defaultOption="Choose..."
                  options={professions}
                  name="profession"
                  onChange={handleChange}
                  value={user.profession}
                />
                <RadioField
                  options={[
                    { name: '??????????????', value: '??????????????' },
                    { name: '??????????????', value: '??????????????' },
                    { name: '????????????', value: '????????????' },
                  ]}
                  value={user.sex}
                  name="sex"
                  onChange={handleChange}
                  label="???????????????? ?????? ??????"
                />
                <MultiSelectField
                  options={rightQualities}
                  onChange={handleChange}
                  defaultValue={user.qualities}
                  name="qualities"
                  label="???????????????? ???????? ????????????????"
                  error={errors.qualities}
                />
                <button type="submit" className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
                  ??????????????????
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <h1>????????????????...</h1>
      )}
    </>
  );
};

export default UserEdit;
