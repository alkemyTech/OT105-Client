import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is equired'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(
      /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!"#$%&/()=*@'¡¿?+~_\-\\´{},;.])(?=.{6,})/,
      "Password must contain at least one letter, one number and one special character (!#$%&/()=*@'¡¿?+~_-´{},;.)",
    ),
  confirmPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^[a-zA-Z0-9!@#$%^&*)(+=._-]*$/,
      'Password needs to contain at least one character, one number and one special character',
    )
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
