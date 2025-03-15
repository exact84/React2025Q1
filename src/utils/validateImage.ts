export const validateAndConvertImage = (file: File): Promise<string> => {
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
