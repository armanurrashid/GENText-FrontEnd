import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faFilePdf, faEye} from '@fortawesome/free-solid-svg-icons'
import {faEye} from '@fortawesome/free-solid-svg-icons'
import pdfIcon from '../../../assets/images/pdf.svg'
import clsx from 'clsx'
type Props = {
  className: string
}
const itemClass = 'ms-1 ms-md-4'

interface FileData {
  fileName: string
  fileSize: string
  uploadDate: string
  totalPage: number
  status: string
  // action: JSX.Element
}

const getStatusStyle = (status: string): string => {
  switch (status) {
    case 'Successful':
      return 'text-success'
    case 'Unsuccessful':
      return 'text-danger'
    case 'Processing':
      return 'text-primary'
    default:
      return ''
  }
}

const data: FileData[] = [
  {
    fileName: 'Robotics for kids.pdf',
    fileSize: '12 MB',
    uploadDate: '07-Dec-2023',
    totalPage: 20,
    status: 'Processing',
    // action: (
    //   <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
    //     {' '}
    //     <FontAwesomeIcon icon={faEye} />{' '}
    //   </a>
    // ),
  },
  {
    fileName: 'Robotics Level2.pdf',
    fileSize: '14 MB',
    uploadDate: '05-Dec-2023',
    totalPage: 40,
    status: 'Unsuccessful',
    // action: (
    //   <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
    //     {' '}
    //     <FontAwesomeIcon icon={faEye} />{' '}
    //   </a>
    // ),
  },
  {
    fileName: 'Tappware.pdf',
    fileSize: '28 MB',
    uploadDate: '04-Dec-2023',
    totalPage: 92,
    status: 'Successful',
    // action: (
    //   <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
    //     {' '}
    //     <FontAwesomeIcon icon={faEye} />{' '}
    //   </a>
    // ),
  },
  {
    fileName: 'New Document.pdf',
    fileSize: '57 MB',
    uploadDate: '03-Dec-2023',
    totalPage: 324,
    status: 'Successful',
    // action: (
    //   <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
    //     {' '}
    //     <FontAwesomeIcon icon={faEye} />{' '}
    //   </a>
    // ),
  },
  {
    fileName: 'Document.pdf',
    fileSize: '98 MB',
    uploadDate: '01-Dec-2023',
    totalPage: 234,
    status: 'Unsuccessful',
    // action: (
    //   <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
    //     {' '}
    //     <FontAwesomeIcon icon={faEye} />{' '}
    //   </a>
    // ),
  },
]

const TablesWidget10: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Recent Activities</span>
        </h3>
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-100px text-center ' style={{width: '40%'}}>
                  {' '}
                  File Name{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '20%'}}>
                  {' '}
                  Upload Date{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '20%'}}>
                  {' '}
                  Total Page{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '20%'}}>
                  {' '}
                  Status{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '20%'}}>
                  {' '}
                  Actions{' '}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((file, index) => (
                <tr key={index}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <div>
                          <img src={pdfIcon} height="35px" alt="" />
                          {/* <FontAwesomeIcon
                            icon={faFilePdf}
                            style={{fontSize: '27px', color: '#F1416C'}}
                          /> */}
                        </div>
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {file.fileName}{' '}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {file.fileSize}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className='fw-semibold d-block fs-7 text-center fw-bold'>
                      {file.uploadDate}
                    </span>
                  </td>
                  <td className='text-center'>
                    <div className='d-flex flex-column w-100 me-2 fw-bold'>
                      {' '}
                      <span>{file.totalPage}</span>
                    </div>
                  </td>
                  <td className={`text-center ${getStatusStyle(file.status)}`}>
                    <div className='d-flex flex-column w-100 me-2 fw-bold'>
                      {' '}
                      <span>{file.status}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className={clsx('app-navbar-item', itemClass)}
                        d-flex
                        justify-content-center
                        mt-5
                      >
                        <div id='kt_activities_toggle' className='d-flex justify-content-center'>
                          <button className='d-flex justify-content-center flex-shrink-0 btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export {TablesWidget10}
