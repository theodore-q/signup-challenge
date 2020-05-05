import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    password: Yup.string()
        .min(9, 'Password must be at least 9 characters long')
        .matches(/[a-z]/gm, 'Password must have a lowercase letter')
        .matches(/[A-Z]/gm, 'Password must have an uppercase letter')
        .matches(/[0-9]/gm, 'Password must contain a number')
        .required('Password is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
});

export default SignupSchema