import * as Yup from 'yup';

// Schema for Full Name Screen
export const FullNameSchema = Yup.object().shape({
  fullname: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Full Name must contain only letters')
    .required('Full Name is required'),
});

// Schema for Gender Selection Screen
export const GenderSchema = Yup.object().shape({
  gender: Yup.string().required("Gender is required"),
});

export const birthplace = Yup.object().shape({
  birthplace: Yup.string().required("Birthplace is required"),
});
export const password = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});
// You can add more schemas if needed
