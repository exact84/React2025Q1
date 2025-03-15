import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../schemas/userSchema';
import { addUser } from '../store/slices/usersSlice';
import { RootState } from '../store/store';
import styles from './ControlledForm.module.css';
import { validateAndConvertImage } from '../utils/validateImage';

export const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderMaleRef.current?.checked
        ? 'male'
        : genderFemaleRef.current?.checked
          ? 'female'
          : null,
      terms: termsRef.current?.checked || false,
      country: countryRef.current?.value || '',
      image: imageRef.current?.files || undefined,
    };

    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as string;
        newErrors[path] = err.message;
      });
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const imageFile = imageRef.current!.files![0];
      const imageBase64 = await validateAndConvertImage(imageFile);

      const newUser = {
        id: generateId(),
        name: result.data.name,
        age: result.data.age,
        email: result.data.email,
        gender: result.data.gender,
        country: result.data.country,
        image: imageBase64,
        isNew: true,
      };

      dispatch(addUser(newUser));
      navigate('/', { state: { newUserId: newUser.id } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({ image: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>User Registration Uncontrolled Form</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              ref={nameRef}
              className={errors.name ? styles.errorInput : ''}
            />
          </div>
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="text"
              ref={ageRef}
              className={errors.age ? styles.errorInput : ''}
            />
          </div>
          {errors.age && <span className={styles.error}>{errors.age}</span>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              ref={emailRef}
              className={errors.email ? styles.errorInput : ''}
            />
          </div>
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              ref={passwordRef}
              className={errors.password ? styles.errorInput : ''}
            />
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              ref={confirmPasswordRef}
              className={errors.confirmPassword ? styles.errorInput : ''}
            />
          </div>
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.centeredGroup}`}>
          <div className={styles.inputWrapper}>
            <label>Gender</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  ref={genderMaleRef}
                  className={errors.gender ? styles.errorInput : ''}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  ref={genderFemaleRef}
                  className={errors.gender ? styles.errorInput : ''}
                />
                Female
              </label>
            </div>
          </div>
          {errors.gender && (
            <span className={styles.error}>{errors.gender}</span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.centeredGroup}`}>
          <div className={styles.inputWrapper}>
            <label htmlFor="terms">I accept the terms</label>
            <input
              id="terms"
              type="checkbox"
              ref={termsRef}
              className={errors.terms ? styles.errorInput : ''}
            />
          </div>
          {errors.terms && <span className={styles.error}>{errors.terms}</span>}
        </div>

        <div className={`${styles.formGroup} ${styles.centeredGroup}`}>
          <div className={styles.inputWrapper}>
            <label htmlFor="image">Photo</label>
            <input
              id="image"
              type="file"
              accept="image/png,image/jpeg"
              ref={imageRef}
              className={errors.image ? styles.errorInput : ''}
            />
          </div>
          {errors.image && <span className={styles.error}>{errors.image}</span>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              list="countryList"
              ref={countryRef}
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
          {errors.country && (
            <span className={styles.error}>{errors.country}</span>
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
