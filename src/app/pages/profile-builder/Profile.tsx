import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {IUpdatePassword, updatePassword,} from '../../modules/accounts/components/settings/SettingsModel'
import {useAuth} from '../../../app/modules/auth/core/Auth'
import {getAuth} from '../../modules/auth/core/AuthHelpers'
import { URL } from '../../modules/auth/core/_requests'
const initialValues = {
  name: '',
  loginID: '',
}
const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
})

const nameFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const loginIDFormValidationSchema = Yup.object().shape({
  loginID: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('UserID is required'),
})

const Profile: React.FC = () => {
  const {currentUser,setCurrentUser} = useAuth()
  const [count, setCount] = useState(0)
  const token = getAuth()
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)
  const [showNameForm, setNameForm] = useState<boolean>(false)
  const [showLoginIDForm, setLoginIDForm] = useState<boolean>(false)

  const [loading2, setLoading2] = useState(false)

useEffect(()=>{
  const fetchData= async ()=>{
    try {
      const response = await fetch( `${URL}/api/user/get-user-by-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token?.api_token}`,
        },
      })
  
      if (response.status === 200) {
        const data = await response.json()
        setCurrentUser(data)
      }
      if (response.status !== 200) {
        alert('Error Fetching Data')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
  fetchData();
},[count]);

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: async (values) => {
      setLoading2(true)
      try {
        const response = await fetch(`${URL}/api/user/change-password/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.api_token}`,
          },
          body: JSON.stringify({
            current_password: values.currentPassword,
            new_password: values.newPassword,
            confirm_password: values.passwordConfirmation,
          }),
        })

        if (response.status === 201) {
          const data = await response.json()
          setLoading2(false)
          setPasswordForm(false)
          alert('Password Successfully Changed')
        }
        if (response.status !== 201) {
          formik2.resetForm()
          setLoading2(false)
          setPasswordForm(false)
          alert('Current Password Wrong')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
  })

  const formik3 = useFormik({
    initialValues,
    validationSchema: nameFormValidationSchema,
    onSubmit: async (values) => {
      setLoading2(true)
      try {
        const response = await fetch( `${URL}/api/user/reset-name/${currentUser?.id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.api_token}`,
          },
          body: JSON.stringify({
            new_name: values.name,
          }),
        })

        if (response.status === 200) {
          const data = await response.json()
          setLoading2(false)
          setNameForm(false)
          setCount(preCount => preCount+1)
          formik3.resetForm()
          alert('Name Successfully Changed')
        }
        if (response.status !== 200) {
          formik3.resetForm()
          setLoading2(false)
          setNameForm(false)
          alert('Name not changed')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
  })

  const formik4 = useFormik({
    initialValues,
    validationSchema: loginIDFormValidationSchema,
    onSubmit: async (values) => {
      setLoading2(true)
      try {
        const response = await fetch( `${URL}/api/user/set-login-id/${currentUser?.id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.api_token}`,
          },
          body: JSON.stringify({
            new_name: values.loginID,
          }),
        })

        if (response.status === 200) {
          const data = await response.json()
          setLoading2(false)
          setLoginIDForm(false)
          setCount(preCount => preCount+1)
          formik4.resetForm()
          alert(data.msg)
        }
        if (response.status !== 200) {
          const data = await response.json()
          formik4.resetForm()
          setLoading2(false)
          setLoginIDForm(false)
          alert(data.error)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
  })

  return (
    <>
      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='d-flex flex-wrap align-items-center'>
            <div id='kt_signin_password' className={' ' + (showNameForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Name</div>
              {currentUser && <div className='fw-bold text-gray-600'>{currentUser?.fullname}</div>}
            </div>
            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showNameForm && 'd-none')}
            >
              <form
                onSubmit={formik3.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='name' className='form-label fs-6 fw-bolder mb-3'>
                        New Name
                      </label>
                      <input
                        style={{background: '#E0E3E9'}}
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        id='name'
                        {...formik3.getFieldProps('name')}
                      />
                      {formik3.touched.name && formik3.errors.name && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik3.errors.name}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='d-flex mt-4'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && 'Change Name'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      formik3.resetForm()
                      setNameForm(false)
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div id='kt_signin_password_button' className={'ms-auto ' + (showNameForm && 'd-none')}>
              <button
                onClick={() => {
                  setNameForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Change Name
              </button>
            </div>
          </div>
          <div className='separator separator-dashed my-6'></div>
          <div className='d-flex flex-wrap align-items-center'>
            <div id='kt_signin_password' className={' ' + (showLoginIDForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>UserID</div>
              {currentUser && <div className='fw-bold text-gray-600'>{currentUser?.UserId}</div>}
            </div>
            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showLoginIDForm && 'd-none')}
            >
              <form
                onSubmit={formik4.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='loginID' className='form-label fs-6 fw-bolder mb-3'>
                        New UserID
                      </label>
                      <input
                        style={{background: '#E0E3E9'}}
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        id='loginID'
                        {...formik4.getFieldProps('loginID')}
                      />
                      {formik4.touched.loginID && formik4.errors.loginID && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik4.errors.loginID}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='d-flex mt-4'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && 'Change UserID'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      formik4.resetForm()
                      setLoginIDForm(false)
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showLoginIDForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setLoginIDForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Change UserID
              </button>
            </div>
          </div>
          <div className='separator separator-dashed my-6'></div>
          <div className='d-flex flex-wrap align-items-center'>
            <div id='kt_signin_email'>
              <div className='fs-6 fw-bolder mb-1'>Email Address</div>
              {currentUser && <div className='fw-bold text-gray-600'>{currentUser?.email}</div>}
            </div>
          </div>

          <div className='separator separator-dashed my-6'></div>

          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Password</div>
              <div className='fw-bold text-gray-600'>************</div>
            </div>

            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
            >
              <form
                onSubmit={formik2.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='currentpassword' className='form-label fs-6 fw-bolder mb-3'>
                        Current Password
                      </label>
                      <input
                        style={{background: '#E0E3E9'}}
                        type='password'
                        className='form-control form-control-lg form-control-solid'
                        id='currentpassword'
                        {...formik2.getFieldProps('currentPassword')}
                      />
                      {formik2.touched.currentPassword && formik2.errors.currentPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.currentPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
                        New Password
                      </label>
                      <input
                        style={{background: '#E0E3E9'}}
                        type='password'
                        className='form-control form-control-lg form-control-solid'
                        id='newpassword'
                        {...formik2.getFieldProps('newPassword')}
                      />
                      {formik2.touched.newPassword && formik2.errors.newPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.newPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
                        Confirm Password
                      </label>
                      <input
                        style={{background: '#E0E3E9'}}
                        type='password'
                        className='form-control form-control-lg form-control-solid'
                        id='confirmpassword'
                        {...formik2.getFieldProps('passwordConfirmation')}
                      />
                      {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.passwordConfirmation}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>
                  Password must be at least 8 character and contain symbols
                </div>

                <div className='d-flex'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && 'Update Password'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      formik2.resetForm()
                      setPasswordForm(false)
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showPasswordForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setPasswordForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export {Profile}
