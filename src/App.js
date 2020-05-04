import React from 'react';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MultiStepForm from './components/MultiStepForm'

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function MultiStepFormPage ({ children, title }) {
  return(children) 
}


const App = () => (
  <div className="App">
    <h1>Sign up to tray.io</h1>
    <MultiStepForm
      initialValues={{
        name: '',
        role: '',
        email: '',
        password: '',
        'tray-product-update-info':false,
        'tray-general-info':false
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        sleep(300).then(() => {
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        });
      }}
    >
      <MultiStepFormPage
        title='User'
      >
        <div>
          <label className="required" htmlFor='name-input'>Name</label>
          <Field
            name="name"
            type="text"
            id='name-input'
            placeholder="Name"
            component="input"
          />
          <ErrorMessage name="name" component="div" className="field-error" />
        </div>
        <div>
          <label htmlFor='role-input'>Role</label>
          <Field
            name="role"
            component="input"
            id='role-input'
            type="text"
            placeholder="Role"
          />
        </div>
        <div>
          <label className="required" htmlFor='email-input'>Email</label>
          <Field
            name="email"
            component="input"
            id='email-input'
            type="email"
            placeholder="Email"
          />
          <ErrorMessage name="email" component="div" className="field-error" />
        </div>
        <div>
          <label className="required" htmlFor='password-input' >Password</label>
          <Field
            name="password"
            component="input"
            id='password-input'
            type="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" component="div" className="field-error" />
          <div className='info callout primary'>
            Passwords must have:
            <ul>
              <li>More then 9 characters.</li>
              <li>At least one number.</li>
              <li>At least one uppercase letter.</li>
              <li>At least one lowercase letter.</li>
            </ul>
          </div>
        </div>

      </MultiStepFormPage>
      <MultiStepFormPage
        title='Privacy'
      >
        <div>
          <Field type="checkbox" name="tray-product-update-info" id="tray-product-update-info"  />
          <label htmlFor='tray-product-update-info'>Receive updates about Tray.io product by email</label>
        </div>
        <div>
          <Field type="checkbox" name='tray-general-info' id="tray-general-info"  />
          <label htmlFor='tray-general-info'>Receive communication by email for other products created by the Tray.io team</label>
        </div>
      </MultiStepFormPage>
      <MultiStepFormPage
        title='Done'
      >
        <div className='success-page'>
          <div className='success-animation'>
              <div className="circle-border"></div>
              <div className="circle">
                <div className="success"></div>
              </div>
          </div>
        <div>Please verify you email address, you should have received an email from us already!</div>

        </div>
      </MultiStepFormPage>
    </MultiStepForm>
  </div>
);

export default App;