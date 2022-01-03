import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Este campo es obligatorio'),
  logo: yup.string().required('Una imagen es requerida'),
  welcome_text: yup
    .string()
    .min(20, 'El texto de bienvenida debe ser de al menos 20 caracteres')
    .required('Este campo es obligatorio'),
  short_description: yup.string().required('Este campo es obligatorio'),
  long_description: yup.string().required('Este campo es obligatorio'),
  facebook_url: yup
    .string()
    .url('URL inválida')
    .required('Este campo es obligatorio'),
  instagram_url: yup
    .string()
    .url('URL inválida')
    .required('Este campo es obligatorio'),
  linkedin_url: yup
    .string()
    .url('URL inválida')
    .required('Este campo es obligatorio'),
});

export default validationSchema;
