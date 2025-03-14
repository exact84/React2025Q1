import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSchema, UserFormData } from '../schemas/userSchema';
import { addUser } from '../store/slices/usersSlice';
import { RootState } from '../store/store';
import styles from './ControlledForm.module.css';

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
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const validateAndConvertImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        reject(new Error('Only PNG or JPEG files are allowed'));
      } else if (file.size > 5 * 1024 * 1024) {
        reject(new Error('File size must be less than 5MB'));
      } else {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!imageRef.current || !imageRef.current.files) {
      setErrors({ image: 'Please upload one file' });
      setIsSubmitting(false);
      return;
    }

    const formData: UserFormData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: (genderRef.current?.value as 'male' | 'female') || '',
      terms: termsRef.current?.checked || false,
      country: countryRef.current?.value || '',
      image: imageRef.current?.files || null,
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
        name: formData.name,
        age: formData.age,
        email: formData.email,
        gender: formData.gender,
        country: formData.country,
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
              type="number"
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

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              ref={genderRef}
              className={errors.gender ? styles.errorInput : ''}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {errors.gender && (
            <span className={styles.error}>{errors.gender}</span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.centeredGroup}`}>
          <div className={styles.inputWrapper}>
            <label>
              <input id="terms" type="checkbox" ref={termsRef} />I accept the
              terms
            </label>
          </div>
          {errors.terms && <span className={styles.error}>{errors.terms}</span>}
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
