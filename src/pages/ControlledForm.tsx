import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSchema, type UserFormData } from '../schemas/userSchema';
import { addUser } from '../store/slices/usersSlice';
import { RootState } from '../store/store';
import styles from './ControlledForm.module.css';

const validateAndConvertImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const validExtensions = ['image/png', 'image/jpeg'];
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (!validExtensions.includes(file.type)) {
      reject(new Error('Only PNG and JPEG files are allowed.'));
    } else if (file.size > maxSizeInBytes) {
      reject(new Error(`File size must be less than ${maxSizeInMB}MB.`));
    } else {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Error reading file.'));
      reader.readAsDataURL(file);
    }
  });
};

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
    setError,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
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

  console.log('Render ControlledForm');
  return (
    <div className={styles.container}>
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...register('name')}
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
              type="number"
              {...register('age', { valueAsNumber: true })}
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
              {...register('email')}
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
              {...register('password')}
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
              {...register('confirmPassword')}
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
                <input type="radio" {...register('gender')} value="male" />
                Male
              </label>
              <label>
                <input type="radio" {...register('gender')} value="female" />
                Female
              </label>
            </div>
          </div>
          {errors.gender && (
            <span className={styles.error}>{errors.gender.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              list="countryList"
              {...register('country')}
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

        <div className={`${styles.formGroup} ${styles.centeredGroup}`}>
          <div className={styles.inputWrapper}>
            <label htmlFor="image">Photo</label>
            <input
              id="image"
              type="file"
              accept="image/png,image/jpeg"
              {...register('image')}
            />
          </div>
          {errors.image && (
            <span className={styles.error}>
              {errors.image.message as string | undefined}
            </span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.centeredGroup}`}>
          <div className={styles.inputWrapper}>
            <label>
              <input type="checkbox" {...register('terms')} />I agree to the
              terms
            </label>
          </div>
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
