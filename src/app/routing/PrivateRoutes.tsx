import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
// import {useLocation} from 'react-router-dom'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import UploadPageWrapper from '../pages/upload-builder/UploadPageWrapper'
import {HistoryPageWrapper} from '../pages/history-builder/HistoryPageWrapper'
import PdfViewPageWrapper from '../pages/pdf-builder/PdfViewPageWrapper'
import NotificationPageWrapper from '../pages/notification-builder/NotificationPageWrapper'
import ProfilePageWrapper from '../pages/profile-builder/ProfilePageWrapper'
import {Process} from '../pages/process-builder/Process'
import {ActivityDrawer} from '../../_metronic/partials'

const PrivateRoutes = () => {
  // const location = useLocation();
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='upload' element={<UploadPageWrapper />} />
        <Route path='history' element={<HistoryPageWrapper />} />
        <Route path='notification' element={<NotificationPageWrapper />} />
        <Route path='profile' element={<ProfilePageWrapper />} />
        <Route path='process' element={<Process />} />
        <Route path='pdfView' element={<PdfViewPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='activity' element={<ActivityDrawer />} />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}