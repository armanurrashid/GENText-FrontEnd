import React, {useEffect, useState} from 'react'
// import {KTIcon} from '../../../../../../_metronic/helpers'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {
  IUpdatePassword,
  updatePassword,
} from '../../modules/accounts/components/settings/SettingsModel'
import {useAuth} from "../../../app/modules/auth/core/Auth"
import {getAuth} from '../../modules/auth/core/AuthHelpers'

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
const Profile: React.FC = () => {
  const {currentUser} = useAuth()
  const token = getAuth()
  // const [emailUpdateData, setEmailUpdateData] = useState<IUpdateEmail>(updateEmail)
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)

  const [loading2, setLoading2] = useState(false)
  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: async(values) => {
      // console.log(token)
      setLoading2(true)
      // setTimeout((values) => {
      //   setPasswordUpdateData(values)
      //   setLoading2(false)
      //   setPasswordForm(false)
      // }, 1000)
      try {
        const response = await fetch('http://localhost:8000/api/user/change-password/',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.api_token}`, // Replace with your actual authorization token
            // Add other headers if needed
          },
          body: JSON.stringify({"current_password":values.currentPassword,"new_password":values.newPassword,"confirm_password":values.passwordConfirmation}),
        });
        
        if (response.status === 201){
          const data = await response.json();
          // console.log(data);
          setLoading2(false);
          setPasswordForm(false);
        }
        
      }
      catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
  })

  return (
    <>
      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='d-flex flex-wrap align-items-center'>
            <div >
              <div className='fs-6 fw-bolder mb-1'>Name</div>
              {currentUser && (<div className='fw-bold text-gray-600'>{currentUser?.fullname}</div>)}
            </div>
          </div>
          <div className='separator separator-dashed my-6'></div>
          <div className='d-flex flex-wrap align-items-center'>
            <div id='kt_signin_email'>
              <div className='fs-6 fw-bolder mb-1'>Email Address</div>
              {currentUser && (<div className='fw-bold text-gray-600'>{currentUser?.email}</div>)}
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
                        type='password'
                        className='form-control form-control-lg form-control-solid '
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
                        type='password'
                        className='form-control form-control-lg form-control-solid '
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
                        Confirm New Password
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
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