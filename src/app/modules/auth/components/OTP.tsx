import React, {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {useLocation} from 'react-router-dom'
import { URL } from '../core/_requests'
import './OTP.css'

const initialValues = {
  otp: '',
}

export function OTP() {
  // const API_URL = process.env.BACKEND_API_URL
  const [allValuesAsString, setAllValuesAsString] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [inputValues, setInputValues] = useState(['', '', '', '', '', ''])
  const [buttonActive, setButtonActive] = useState(false)
  const [isResending, setIsResending] = useState(false) // Track whether it's a resend operation
  const inputRefs = useRef<Array<HTMLInputElement | null>>(inputValues.map(() => null))
  const location = useLocation()
  const {email} = location.state || {}
  const navigate = useNavigate()

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)
    const allValuesAsString = newInputValues.join('')
    setAllValuesAsString(allValuesAsString)
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

  const [timeRemaining, setTimeRemaining] = useState(120) // 2 minutes in seconds
  const [timerExpired, setTimerExpired] = useState(false)
  useEffect(() => {
    if (isResending) {
      // Reset the timer when isResending becomes true
      setTimeRemaining(30)
      setTimerExpired(false)
    }
  }, [isResending])
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

  useEffect(() => {}, [allValuesAsString])

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      if (!isResending) {
        try {
          const allValuesFilled = inputValues.every((value) => value !== '')
          if (allValuesFilled) {
            const otpValue = inputValues.join('')
            setOtp(otpValue)
            await setAllValuesAsString(otpValue)
          }
          setLoading(true)
          const response = await fetch(`${URL}/api/user/confirm-otp/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              OTP: allValuesAsString,
              email: email,
            }),
          })
          if (!response.ok) {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
          }
          if (response.ok) {
            console.log('ok')
            navigate('/auth/login')
            setHasErrors(false)
            setLoading(false)
          }
        } catch (error) {
          setStatus('An error occurred.')
        }
      }
    },
  })

  const handleButtonClick = async () => {

    try {
      const allValuesFilled = inputValues.every((value) => value !== '')
      if (allValuesFilled) {
        const otpValue = inputValues.join('')
        setOtp(otpValue)
        await setAllValuesAsString(otpValue)
      }
      setLoading(true)
      const response = await fetch(`${URL}/api/user/request-otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      })
      if (!response.ok) {
        setLoading(false)
      }

      if (response.ok) {
        setHasErrors(false)
        setLoading(false)
        setIsResending(false)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }


  const handleCancelButton = async () => {

    try {
      const response = await fetch(`${URL}/api/user/cancel-registration/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      })
      if (response.ok) {
        setHasErrors(false)
        setIsResending(false)
        navigate('/auth/registration')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }


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
          />
        ))}
      </div>

      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger mt-3 mt-0'>
          <div className='alert-text font-weight-bold'>Incorrect OTP</div>
        </div>
      )}

      <div className='fv-row mb-5'>
        {formik.touched.otp && formik.errors.otp && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.otp}</span>
            </div>
          </div>
        )}
      </div>
      <div className='pt-0 pb-2 text-center timer'>
        {timerExpired ? null : (
          <p className='text-danger'>Time Remaining: {formatTime(timeRemaining)}</p>
        )}
      </div>
      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <div className='mx-5'>
          {timerExpired ? (
            isResending ? (
              <button
                type='submit'
                className='btn btn-lg btn-primary mb-5'
                disabled={formik.isSubmitting || (!isResending && !buttonActive)}
                style={{width: '120px'}}
              >
                {!loading && <span className='indicator-label'>Verify</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            ) : (
              <button
                type='button'
                className='btn btn-lg btn-primary mb-5'
                style={{width: '120px'}}
                onClick={() => {
                  setIsResending(!isResending)
                  handleButtonClick()
                }}
              >
                 {!loading && <span className='indicator-label'>Resend</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block', fontSize:'5px'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2' style={{fontSize:"5px"}}></span>
                  </span>
                )}
              </button>
            )
          ) : (
            <button
              type='submit'
              className='btn btn-lg btn-primary mb-5'
              disabled={formik.isSubmitting || !buttonActive}
              style={{width: '120px'}}
            >
               {!loading && <span className='indicator-label'>Verify</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
            </button>
          )}
        </div>
          <button type='button'
                id='kt_sign_up_submit'
                className='btn btn-lg btn-primary mb-5'
                style={{width: '120px'}} onClick={handleCancelButton}>Cancel</button>
      </div>
    </form>
  )
}

export default OTP
