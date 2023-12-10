/* eslint-disable jsx-a11y/anchor-is-valid */
// import clsx from 'clsx'
import {FC, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import { FaSpinner, FaUpload, FaCheck} from 'react-icons/fa';

interface Data {
  UploadConfirmation: string
  ProcessingText: string
  finalText: string
}

const notificationData: Data[] = [
  {
    UploadConfirmation: 'Document.pdf is uploaded',
    ProcessingText: 'Document.pdf is Processing',
    finalText: 'Document.pdf Processing Successful',
  },
]

const HeaderNotificationsMenu: FC = () => {
  useEffect(() => {
    const tab = document.getElementById('kt_topbar_notifications_1')
    if (tab) {
      tab.classList.add('show', 'active')
    }
  }, [])

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
      data-kt-menu='true'
    >
      <div
        className='d-flex flex-column bgi-no-repeat rounded-top'
        style={{backgroundImage: `url('${toAbsoluteUrl('/media/misc/menu-header-bg.jpg')}')`}}
      >
        <ul
          className='nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9 d-flex justify-content-center'
          style={{background: '#3D53B8'}}
        >
          <li className='nav-item'>
            <h3 className='text-white mb-3 mt-3'>Notifications</h3>
          </li>
        </ul>
      </div>

      <div className='tab-content'>
        <div className='tab-pane fade show active' id='kt_topbar_notifications_1'>
          <div className='scroll-y mh-325px my-3'>
            {notificationData.map((file, index) => (
              <div key={index} className='flex-stack'>
                <table className='table'>
                  <tbody>
                    <tr  className="table-success">
                      <th className='px-5'><FaCheck className='success-icon' /></th>
                      <td>{file.finalText}</td>
                    </tr>
                    <tr className="table-primary">
                      <th className='px-5'> <FaSpinner className='spinner' /></th>
                      <td >{file.ProcessingText}</td>
                    </tr>
                    <tr className="table-warning">
                      <th className='px-5'><FaUpload className='upload-icon' /></th>
                      <td >{file.UploadConfirmation}</td>
                    </tr>
                    <tr  className="table-success">
                      <th className='px-5'><FaCheck className='success-icon' /></th>
                      <td>{file.finalText}</td>
                    </tr>
                    <tr className="table-primary">
                      <th className='px-5'> <FaSpinner className='spinner' /></th>
                      <td >{file.ProcessingText}</td>
                    </tr>
                    <tr className="table-warning">
                      <th className='px-5'><FaUpload className='upload-icon' /></th>
                      <td >{file.UploadConfirmation}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className='py-3 text-center border-top'>
            <Link
              to='/pages/history-builder/History.tsx'
              className='btn btn-color-gray-600 btn-active-color-primary'
            >
              View History <KTIcon iconName='arrow-right' className='fs-5' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export {HeaderNotificationsMenu}
