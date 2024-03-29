import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {useAuth} from '../core/Auth'
import { URL } from '../core/_requests'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email / UserID is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      try {
        setLoading(true)
        const response = await fetch(`${URL}/api/user/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({login_id: values.email, password: values.password}),
        })

        if (!response.ok) {
          saveAuth(undefined)
          setStatus('The login details are incorrect')
          setSubmitting(false)
          setLoading(false)
        }
        if (response.ok) {
          const data = await response.json()
          const AuthData = {api_token: data.token.access, refreshToken: data.token.refresh}
          saveAuth(data.user)
          setCurrentUser(data.user)
        }
      } catch (error) {
        setStatus('An error occurred during login.')
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
      </div>
      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : null}

      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email / UserID</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='text'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6'>Password</label>
        <input
          placeholder='Password'
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      <div className='d-flex justify-content-between mt-5'>
        <div className="form-check">
          {/* <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
          <label className="link-primary fs-base fw-semibold" htmlFor="flexCheckChecked">
            Remember Me
          </label> */}
        </div>
        <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
          <div />
          <Link to='/auth/forgot-password' className='link-primary'>
            Forgot Password ?
          </Link>
        </div>
      </div>

      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
    </form>
  )
}
