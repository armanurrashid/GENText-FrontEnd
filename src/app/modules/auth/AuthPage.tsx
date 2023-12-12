import {Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {OTP} from './components/OTP'
import {Login} from './components/Login'
import {AuthLayout} from './AuthLayout'
import { SetPassword } from './components/SetPassword'
// import ProfilePageWrapper from '../../pages/profile-builder/ProfilePageWrapper'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='OTP' element={<OTP />} />
      <Route path='set-password/:param1/:param2' element={<SetPassword />} />
      {/* <Route path='dashboard' element = {<ProfilePageWrapper />} /> */}
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
