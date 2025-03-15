import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSchema, type UserFormData } from '../schemas/userSchema';
import { addUser } from '../store/slices/usersSlice';
import { RootState } from '../store/store';
import styles from './ControlledForm.module.css';
import { validateAndConvertImage } from '../utils/validateImage';

export const ControlledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    setError,
    trigger,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    delayError: 500,
  });

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      let imageBase64 = '';
      if (data.image && data.image.length > 0) {
        imageBase64 = await validateAndConvertImage(data.image[0]);
      }

      const newUser = {
        id: generateId(),
        name: data.name,
        age: data.age,
        email: data.email,
        gender: data.gender,
        country: data.country,
        image: imageBase64,
        isNew: true,
      };

      dispatch(addUser(newUser));
      navigate('/', { state: { newUserId: newUser.id } });
    } catch (error: unknown) {
      if (error instanceof Error)
        setError('image', { type: 'manual', message: error.message });
    }
  };

  const validateField = (fieldName: keyof UserFormData) => {
    if (dirtyFields[fieldName]) {
      trigger(fieldName);
    }
  };

  const validatePasswords = () => {
    trigger(['password', 'confirmPassword']);
  };

  return (
    <div className={styles.container}>
      <h1>User Registration React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...register('name', {
                onChange: () => validateField('name'),
              })}
              className={errors.name ? styles.errorInput : ''}
            />
          </div>
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="text"
              {...register('age', {
                onChange: () => validateField('age'),
              })}
              className={errors.age ? styles.errorInput : ''}
            />
          </div>
          {errors.age && (
            <span className={styles.error}>{errors.age.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                onChange: () => validateField('email'),
              })}
              className={errors.email ? styles.errorInput : ''}
            />
          </div>
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', {
                onChange: validatePasswords,
              })}
              className={errors.password ? styles.errorInput : ''}
            />
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                onChange: validatePasswords,
              })}
              className={errors.confirmPassword ? styles.errorInput : ''}
            />
          </div>
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.centeredGroup}`}>
          <div className={styles.inputWrapper}>
            <label>Gender</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  {...register('gender', {
                    onChange: () => validateField('gender'),
                  })}
                  value="male"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  {...register('gender', {
                    onChange: () => validateField('gender'),
                  })}
                  value="female"
                />
                Female
              </label>
            </div>
          </div>
          {errors.gender && (
            <span className={styles.error}>{errors.gender.message}</span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.centeredGroup}`}>
          <div className={styles.inputWrapper}>
            <label>
              <input
                type="checkbox"
                {...register('terms', {
                  onChange: () => validateField('terms'),
                })}
              />
              I agree to the terms
            </label>
          </div>
          {errors.terms && (
            <span className={styles.error}>{errors.terms.message}</span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.centeredGroup}`}>
          <div className={styles.inputWrapper}>
            <label htmlFor="image">Photo</label>
            <input
              id="image"
              type="file"
              accept="image/png,image/jpeg"
              {...register('image', {
                onChange: () => validateField('image'),
              })}
            />
          </div>
          {errors.image && (
            <span className={styles.error}>
              {errors.image.message as string | undefined}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              list="countryList"
              {...register('country', {
                onChange: () => validateField('country'),
              })}
              className={errors.country ? styles.errorInput : ''}
            />
            <datalist id="countryList">
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </datalist>
          </div>
          {errors.country?.message && (
            <span className={styles.error}>{errors.country.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isDirty || Object.keys(errors).length > 0}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
