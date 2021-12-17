import * as Yup from 'yup';

export const UserFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name must be at least 4 characters')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  role: Yup.string().required('Role is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
