import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilePdf, faEye} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
// import { getAuth, useAuth } from '../../../../app/modules/auth';
// interface CustomLinkProps {
//   to: {
//     pathname: string
//     state: {
//       key1: string
//     }
//   }
// }
// type Props = {
//   className: string
// }
const itemClass = 'ms-1 ms-md-4'
const getStatusStyle = (status: string): string => {
  switch (status) {
    case 'complete':
      return 'text-success'
    case 'incomplete':
      return 'text-danger'
    case 'pending':
      return 'text-primary'
    default:
      return ''
  }
}

const TablesWidget11: React.FC<{className: any; tableData: any}> = ({className, tableData}) => {
  const dataToPass = (fileId: string, fileName: string) => ({key1: fileId, key2: fileName})

  return (
    <div className={`card ${className}`}>
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
              {tableData
                ? tableData.map((file, index) => (
                    <tr key={index}>
                      <td style={{wordBreak: 'break-word'}}>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            <div>
                              <FontAwesomeIcon
                                icon={faFilePdf}
                                style={{fontSize: '27px', color: '#F1416C'}}
                              />
                            </div>
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                          <Link
                              to='/pdfView'
                              state={dataToPass(file['id'], file['pdf_file_name'])}
                              className='text-dark fw-bold text-hover-primary fs-6'
                            >
                              {file['pdf_file_name']}{' '}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                              {file['total_size']} KB
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className='fw-semibold d-block fs-7 text-center fw-bold'>
                          {file['uploaded_date']}
                        </span>
                      </td>
                      <td className='text-center'>
                        <div className='d-flex flex-column w-100 me-2 fw-bold'>
                          {' '}
                          <span>{file['total_page']}</span>
                        </div>
                      </td>
                      <td className={`text-center ${getStatusStyle(file['upload_status'])}`}>
                        <div className='d-flex flex-column w-100 me-2 fw-bold'>
                          {' '}
                          <span>
                            {file['upload_status'] === 'complete'
                              ? 'Successful'
                              : file['upload_status'] === 'incomplete'
                              ? 'Unsuccessful'
                              : 'Processing'}
                          </span>
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
                            <div
                              // id='kt_activities_toggle'
                              className='d-flex justify-content-center'
                            >
                              <div className='btn btn-icon btn-bg-light btn-sm me-1'>
                                {' '}
                                <Link to='/process' state={dataToPass(file['id'],file['pdf_file_name'])}>
                                  <FontAwesomeIcon icon={faEye} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export {TablesWidget11}
