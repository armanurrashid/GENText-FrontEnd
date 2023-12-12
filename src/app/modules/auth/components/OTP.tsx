import React, {useState, useEffect, useRef} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import './OTP.css'

const initialValues = {
  otp: '',
}

export function OTP() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [inputValues, setInputValues] = useState(['', '', '', '', '', ''])
  const [buttonActive, setButtonActive] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>(inputValues.map(() => null))

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)
  }

  const handleKeyUp = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentInput = e.target as HTMLInputElement
    const nextIndex = index + 1
    const prevIndex = index - 1

    if (currentInput.value.length > 1) {
      currentInput.value = ''
      return
    }

    if (e.key === 'Backspace') {
      if (prevIndex >= 0 && inputRefs.current[prevIndex]) {
        inputRefs.current[prevIndex]?.focus()
      }
    } else if (nextIndex < inputValues.length && inputValues[nextIndex] === '') {
      setInputValues((prevValues) => {
        const newValues = [...prevValues]
        newValues[nextIndex] = ' '
        return newValues
      })

      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus()
      }
    }
  }

  useEffect(() => {
    const isAllFilled = inputValues.every((value) => value !== '')
    setButtonActive(isAllFilled)
  }, [inputValues])

  const [timeRemaining, setTimeRemaining] = useState(10) // 2 minutes in seconds
  const [timerExpired, setTimerExpired] = useState(false)
  useEffect(() => {
    if (timeRemaining <= 0) {
      setTimerExpired(true)
      return
    }

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeRemaining])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  // const handleButtonClick = () => {
  //   console.log('Button clicked!')
  // }

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8000/api/user/confirm-otp/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp: values.otp,
          }),
        })
        if (!response.ok) {
          setHasErrors(true)
          setLoading(false)
          setSubmitting(false)
        }
        if (response.ok) {
          setHasErrors(false)
          setLoading(false)
        }
      } catch (error) {
        setStatus('An error occurred.')
      }
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_password_reset_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-10'>
        <h1 className='text-dark fw-bolder mb-3'>Enter OTP</h1>
        <div className='text-gray-500 fw-semibold fs-6'>
          An OTP was sent to your email. Please Check
        </div>
      </div>
      {/* <div> */}
      {/* <h4>Enter OTP Code</h4> */}
      <div className='input-field d-flex justify-content-center'>
        {inputValues.map((value, index) => (
          <input
            key={index}
            type='number'
            className='mx-1'
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyUp={(e) => handleKeyUp(index, e)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            // {...formik.getFieldProps('otp')} // Check if this is necessary
            // className={clsx(
            //   'form-control bg-transparent',
            //   {'is-invalid': formik.touched.otp && formik.errors.otp},
            //   {'is-valid': formik.touched.otp && !formik.errors.otp}
            // )}
          />
        ))}

        {/* {inputValues.map((value, index) => (
            <input
              key={index}
              type='number'
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyUp={(e) => handleKeyUp(index, e)}
              ref={(ref) => (inputRefs.current[index] = ref)}
              {...formik.getFieldProps('otp')}
              className={clsx(
                'form-control bg-transparent',
                {'is-invalid': formik.touched.otp && formik.errors.otp},
                {'is-valid': formik.touched.otp && !formik.errors.otp}
              ) }
            />
          ))} */}
      </div>

      {/* <button disabled={!buttonActive}>Verify OTP</button> */}
      {/* </div> */}

      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
            Sorry, looks like there are some errors detected, please try again.
          </div>
        </div>
      )}

      {/* {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>Sent password reset. Please check your email</div>
        </div>
      )} */}

      <div className='fv-row mb-5'>
        {/* <label className='form-label fw-bolder text-gray-900 fs-6'>OTP</label> */}
        {/* <input
          type='number'
          placeholder=''
          autoComplete='off'
          {...formik.getFieldProps('otp')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.otp && formik.errors.otp},
            {'is-valid': formik.touched.otp && !formik.errors.otp,}
          )}
        /> */}
        {formik.touched.otp && formik.errors.otp && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.otp}</span>
            </div>
          </div>
        )}
      </div>
      <div className='pt-0 pb-2 text-center timer'>
        {timerExpired ? null : ( // </button> //   Resend OTP // <button className='btn btn-primary resendOTP' onClick={handleButtonClick}> // <p></p>
          <p className='text-danger'>Time Remaining: {formatTime(timeRemaining)}</p>
        )}
      </div>
      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <div className='mx-5'>
          {/* <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-primary me-4 mt-2'
            disabled={!buttonActive}
            style={{width: '120px'}}
          >
            {timerExpired ? (
          <span className='indicator-label'>Resend</span>
        ) : (
          <span className='indicator-label'>Verify</span>
        )}
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button> */}
          {timerExpired ? (
            // <Link to='/auth/login'>
              <button
                type='submit'
                id='kt_password_reset_submit'
                className='btn btn-primary me-4 mt-2 otpButtons'
                // disabled={!buttonActive}
                style={{width: '120px'}}
              >
                <span className='indicator-label'>Resend</span>
                {loading && (
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            // </Link>
          ) : (
            // <Link to='../../../pages/profile-builder/ProfilePageWrapper.tsx'>
              <button
                type='submit'
                id='kt_password_reset_submit'
                className='btn btn-primary me-4 mt-2 otpButtons'
                disabled={!buttonActive}
                style={{width: '120px'}}
              >
                <span className='indicator-label'>Verify</span>
                {loading && (
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            // </Link>
          )}
        </div>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_password_reset_form_cancel_button'
            className='btn btn-light mx-5  mt-2 otpButtons'
            disabled={formik.isSubmitting || !formik.isValid}
            style={{width: '120px'}}
          >
            Cancel
          </button>
        </Link>{' '}
      </div>
    </form>
  )
}

export default OTP
