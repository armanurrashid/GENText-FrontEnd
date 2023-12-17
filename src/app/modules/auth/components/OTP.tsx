import React, {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {useLocation} from 'react-router-dom'
import './OTP.css'

const initialValues = {
  otp: '',
}

export function OTP() {
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
    console.log(allValuesAsString)
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

  const [timeRemaining, setTimeRemaining] = useState(30) // 2 minutes in seconds
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
      console.log("Resend verify")
      console.log("First ", isResending)
      if (!isResending) {
        console.log('Input:', allValuesAsString)
        try {
          const allValuesFilled = inputValues.every((value) => value !== '')
          if (allValuesFilled) {
            const otpValue = inputValues.join('')
            setOtp(otpValue)
            await setAllValuesAsString(otpValue)
          }
          setLoading(true)
          const response = await fetch('http://localhost:8000/api/user/confirm-otp/', {
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
            console.log('Not ok')
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
      else{
        console.log("Resend")
      }
    },
  })

  const handleButtonClick = async () => {
    console.log('Button Clicked:', allValuesAsString)

    try {
      const allValuesFilled = inputValues.every((value) => value !== '')
      if (allValuesFilled) {
        const otpValue = inputValues.join('')
        setOtp(otpValue)
        await setAllValuesAsString(otpValue)
      }
      setLoading(true)
      const response = await fetch('http://localhost:8000/api/user/request-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      })
      console.log('Response:', response)
      if (!response.ok) {
        setLoading(false)
      }

      if (response.ok) {
        setHasErrors(false)
        setLoading(false)
        //aikhane change
        setIsResending(false)
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
              // "Verify" button inside this block
              <button
                type='submit'
                id='kt_sign_up_submit'
                className='btn btn-lg btn-primary w-100 mb-5'
                disabled={formik.isSubmitting || (!isResending && !buttonActive)}
                style={{width: '120px'}}
                
              >
                <div>{isResending}uytr</div>
                <span className='indicator-label'>Verify</span>
               
                {loading && (
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            ) : (
              // "Resend" button inside this block
              <button
                type='button'
                id='kt_sign_up_submit'
                className='btn btn-lg btn-primary w-100 mb-5'
                style={{width: '120px'}}
                onClick={() => {
                  setIsResending(!isResending)
                  handleButtonClick()
                }}
              >
                <span className='indicator-label'>Resend</span>
                {loading && (
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            )
          ) : (
            // "Verify" button outside this block
            <button
              type='submit'
              id='kt_sign_up_submit'
              className='btn btn-lg btn-primary w-100 mb-5'
              disabled={formik.isSubmitting || !buttonActive}
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
          )}
        </div>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_password_reset_form_cancel_button'
            className='btn btn-light mx-5 mt-2 otpButtons'
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
