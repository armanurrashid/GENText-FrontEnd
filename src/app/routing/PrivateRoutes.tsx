// import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
// import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
// import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
// import {WithChildren} from '../../_metronic/helpers'
import UploadPageWrapper from '../pages/upload-builder/UploadPageWrapper'
import HistoryPageWrapper from '../pages/history-builder/HistoryPageWrapper'
import NotificationPageWrapper from '../pages/notification-builder/NotificationPageWrapper'
import ProfilePageWrapper from '../pages/profile-builder/ProfilePageWrapper'
// import ProcessPageWrapper from '../pages/process-builder/ProcessPageWrapper'
import { Process } from '../pages/process-builder/Process'
import { ActivityDrawer } from '../../_metronic/partials'

const PrivateRoutes = () => {
  // const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  // const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  // const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  // const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  // const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  // const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='upload' element={<UploadPageWrapper />} />
        <Route path='history' element={<HistoryPageWrapper />} />
        <Route path='notification' element={<NotificationPageWrapper />} />
        <Route path='profile' element={<ProfilePageWrapper />} />
        <Route path='process' element={<Process />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='activity' element={<ActivityDrawer />} />
        {/* <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
  
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
           
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        /> */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

// const SuspensedView: FC<WithChildren> = ({children}) => {
//   const baseColor = getCSSVariableValue('--bs-primary')
//   TopBarProgress.config({
//     barColors: {
//       '0': baseColor,
//     },
//     barThickness: 1,
//     shadowBlur: 5,
//   })
//   return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
// }

export {PrivateRoutes}
