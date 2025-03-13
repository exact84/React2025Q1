import { z } from 'zod';
import styles from './ContactForm.module.css';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

function ContactForm() {
  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData);
      const validatedData = formSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation errors:', error.errors);
      } else {
        console.error('Submission error:', error);
      }
    }
  };

  return (
    <form action={handleSubmit} className={styles.form} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" />
      </div>

      <div className={styles.formActions}>
        <button
          type="submit"
          className={`btn btn-primary ${styles.submitButton}`}
        >
          Send Message
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
