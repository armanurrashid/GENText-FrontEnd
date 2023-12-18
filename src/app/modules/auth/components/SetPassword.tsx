import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'

const initialValues = {
  new_password: '',
  confirm_password: '',
}

const setpasswordSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  confirm_password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password confirmation is required')
    .oneOf([Yup.ref('new_password')], "Password and Confirm Password didn't match"),
})

export function SetPassword() {
  const currentPath = window.location.pathname
  const parts = currentPath.split('/')
  const authIndex = parts.indexOf('auth')
  const setPasswordIndex = parts.indexOf('set-password')
  let param1, param2
  if (authIndex !== -1 && setPasswordIndex !== -1) {
    param1 = parts[setPasswordIndex + 1]
    param2 = parts[setPasswordIndex + 2]
  }

  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: setpasswordSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      try {
        setLoading(true)
        const response = await fetch(
          `http://localhost:8000/api/user/set-new-password/${param1}/${param2}/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              new_password: values.new_password,
              confirm_password: values.confirm_password,
            }),
          }
        )
        if (!response.ok) {
          saveAuth(undefined)
          setStatus('An error occurred')
          setSubmitting(false)
          setLoading(false)
        }
        if (response.ok) {
          const data = await response.json()
          setStatus('Password Changed')
          saveAuth(data.token)
          setCurrentUser(data.user)
          setLoading(false)
        }
      } 
      catch (error) {
        setStatus('An error occurred')
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center '>
        <h1 className='text-dark fw-bolder mb-5'>Set Password</h1>
      </div>
      <div className='row g-3 mb-8'>{/* <div className='col-md-6'></div> */}</div>
      {formik.status && formik.status !== 'An error occurred' && (
        <div className='mb-lg-5 alert alert-success'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}
      {formik.status && formik.status === 'An error occurred' && (
        <div className='mb-lg-5 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}
      <div className='fv-row mb-4 ' data-kt-password-meter='true'>
        <div className='mb-1 '>
          <label className='form-label fw-bolder text-dark fs-6'>New Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('new_password')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.new_password && formik.errors.new_password,
                },
                {
                  'is-valid': formik.touched.new_password && !formik.errors.new_password,
                }
              )}
            />
            {formik.touched.new_password && formik.errors.new_password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.new_password}</span>
                </div>
              </div>
            )}
          </div>
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      <div className='fv-row mb-4'>
        <label className='form-label fw-bolder text-dark fs-6 mt-4'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('confirm_password')}
          className={clsx(
            'form-control bg-transparent mb-5',
            {
              'is-invalid': formik.touched.confirm_password && formik.errors.confirm_password,
            },
            {
              'is-valid': formik.touched.confirm_password && !formik.errors.confirm_password,
            }
          )}
        />
        {formik.touched.confirm_password && formik.errors.confirm_password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.confirm_password}</span>
            </div>
          </div>
        )}
      </div>
      <div className='text-center'>
        <div>
          <button
            type='submit'
            id='kt_sign_up_submit'
            className='btn btn-lg btn-primary w-100 mb-5 mt-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Submit</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        <div>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_signup_form_cancel_button'
              className='btn btn-lg btn-light-primary w-100 mb-0'
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </form>
  )
}
