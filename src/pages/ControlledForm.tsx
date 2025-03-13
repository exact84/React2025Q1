import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSchema, type UserFormData } from '../schemas/userSchema';
import { addUser } from '../store/slices/usersSlice';
import { RootState } from '../store/store';
import styles from './ControlledForm.module.css';

export const ControlledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const onSubmit = (data: UserFormData) => {
    dispatch(
      addUser({
        id: generateId(),
        name: data.name,
        age: data.age,
        email: data.email,
        gender: data.gender,
        country: data.country,
      })
    );
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={errors.name ? styles.errorInput : ''}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            {...register('age', { valueAsNumber: true })}
            className={errors.age ? styles.errorInput : ''}
          />
          {errors.age && (
            <span className={styles.error}>{errors.age.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={errors.password ? styles.errorInput : ''}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? styles.errorInput : ''}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Gender</label>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" {...register('gender')} value="male" />
              Male
            </label>
            <label>
              <input type="radio" {...register('gender')} value="female" />
              Female
            </label>
          </div>
          {errors.gender && (
            <span className={styles.error}>{errors.gender.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            {...register('country')}
            className={errors.country ? styles.errorInput : ''}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className={styles.error}>{errors.country.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Photo</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register('image')}
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            <input type="checkbox" {...register('terms')} />I agree to the terms
          </label>
          {errors.terms && (
            <span className={styles.error}>{errors.terms.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
