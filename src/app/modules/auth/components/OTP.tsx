// import {useState} from 'react'
// import clsx from 'clsx'
// import {Link} from 'react-router-dom'
// import {useFormik} from 'formik'

// const initialValues = {
//   email: '',
// }

// export function OTP() {
//   const [loading, setLoading] = useState(false)
//   const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
//   const formik = useFormik({
//     initialValues,
//     onSubmit: async (values, {setStatus, setSubmitting}) => {
//       try {
//         setLoading(true)
//         const response = await fetch('http://localhost:8000/api/user/confirm-otp/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: values.email,
//           }),
//         })
//         if (!response.ok) {
//           setHasErrors(true)
//           setLoading(false)
//           setSubmitting(false)
//         }
//         if (response.ok) {
//           setHasErrors(false)
//           setLoading(false)
//         }
//       } catch (error) {
//         setStatus('An error occurred during registration.')
//       }
//     },
//   })

//   return (
//     <form
//       className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
//       noValidate
//       id='kt_login_password_reset_form'
//       onSubmit={formik.handleSubmit}
//     >
//       <div className='text-center mb-10'>
//         <h1 className='text-dark fw-bolder mb-3'>Enter OTP</h1>
//         <div className='text-gray-500 fw-semibold fs-6'>
//           An OTP was sent to your email. Please Check
//         </div>
//       </div>
//       {hasErrors === true && (
//         <div className='mb-lg-15 alert alert-danger'>
//           <div className='alert-text font-weight-bold'>
//             Sorry, looks like there are some errors detected, please try again.
//           </div>
//         </div>
//       )}

//       {hasErrors === false && (
//         <div className='mb-10 bg-light-info p-8 rounded'>
//           <div className='text-info'>Sent password reset. Please check your email</div>
//         </div>
//       )}

//       <div className='fv-row mb-8'>
//         <label className='form-label fw-bolder text-gray-900 fs-6'>OTP</label>
//         <input
//           type='email'
//           placeholder=''
//           autoComplete='off'
//           {...formik.getFieldProps('email')}
//           className={clsx(
//             'form-control bg-transparent',
//             {'is-invalid': formik.touched.email && formik.errors.email},
//             {
//               'is-valid': formik.touched.email && !formik.errors.email,
//             }
//           )}
//         />
//         {formik.touched.email && formik.errors.email && (
//           <div className='fv-plugins-message-container'>
//             <div className='fv-help-block'>
//               <span role='alert'>{formik.errors.email}</span>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
//         <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'>
//           <span className='indicator-label'>Submit</span>
//           {loading && (
//             <span className='indicator-progress'>
//               Please wait...
//               <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
//             </span>
//           )}
//         </button>
//         <Link to='/auth/login'>
//           <button
//             type='button'
//             id='kt_login_password_reset_form_cancel_button'
//             className='btn btn-light'
//             disabled={formik.isSubmitting || !formik.isValid}
//           >
//             Cancel
//           </button>
//         </Link>{' '}
//       </div>
//     </form>
//   )
// }

import React, {useState, useEffect, useRef} from 'react'
import './OTP.css'

export function OTP() {
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
      // Move focus to the previous input box when Backspace is pressed
      if (prevIndex >= 0 && inputRefs.current[prevIndex]) {
        inputRefs.current[prevIndex]?.focus()
      }
    } else if (nextIndex < inputValues.length && inputValues[nextIndex] === '') {
      setInputValues((prevValues) => {
        const newValues = [...prevValues]
        newValues[nextIndex] = ' '
        return newValues
      })

      // Move focus to the next input box
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus()
      }
    }
  }

  useEffect(() => {
    const isAllFilled = inputValues.every((value) => value !== '')
    setButtonActive(isAllFilled)
  }, [inputValues])

  return (
    <div>
      <h4>Enter OTP Code</h4>
      <form action='#'>
        <div className='input-field'>
          {inputValues.map((value, index) => (
            <input
              key={index}
              className='mx-1'
              type='number'
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyUp={(e) => handleKeyUp(index, e)}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </div>

        <button disabled={!buttonActive}>Verify OTP</button>
      </form>
      <div className='py-4 text-center'>
        <p className='text-danger'>Time Remaining: 15s</p>
      </div>
    </div>
  )
}

export default OTP
