import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faDownload} from '@fortawesome/free-solid-svg-icons'
import {Tooltip} from 'react-tooltip'
import pdf_icon from '../../../assets/images/pdf.svg'
// import {getAuth, useAuth} from '../../../../app/modules/auth'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
// import {Process} from '../../../../app/pages/process-builder/Process'
// import {ActivityDrawer} from '../partials'

type Props = {
  className: string
}

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

const TablesWidget10: React.FC<{className: any; tableData: any}> = ({className, tableData}) => {
  const dataToPass = (fileId: string, fileName: string, filePage: string, fileSize: number) => ({key1: fileId, key2: fileName, key3: filePage, key4: fileSize})
  return (
    <div className={`card ${className}`}>
      <Tooltip id='my-tooltip-inline' className='text-dark fw-bold fs-8' style={{backgroundColor: '#B8E2F2'}} />
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
                <th className='min-w-100px text-center ' style={{width: '15%'}}>
                  {' '}
                  Total Page{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '25%'}}>
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
                            <img src={pdf_icon} alt="" style={{width: '30px'}}/>
                            </div>
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            {/* <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                              {file['pdf_file_name']}{' '}
                            </a> */}
                            <Link
                              to='/pdfView'
                              state={dataToPass(file['id'], file['pdf_file_name'], file['total_page'], file['total_size'])}
                              className='text-dark fw-bold text-hover-primary fs-6'
                              data-tooltip-id='my-tooltip-inline'
                              data-tooltip-content='View Pdf'
                            >
                              {file['pdf_file_name']}{' '}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                              {file['total_size'] < 1024
                                ? `${file['total_size']} KB`
                                : `${(file['total_size'] / 1024).toFixed(2)} MB`}
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
                              ? 'Text Extraction Successful'
                              : file['upload_status'] === 'incomplete'
                              ? 'Text Extraction Unsuccessful'
                              : 'Text Extraction in Process'}
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
                              <div
                                className='btn btn-icon btn-bg-light btn-sm me-1'
                                data-tooltip-id='my-tooltip-inline'
                                data-tooltip-content='View Output'
                              >
                                {' '}
                                <Link
                                  to='/process'
                                  state={dataToPass(file['id'], file['pdf_file_name'], file['total_page'], file['total_size'])}
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </Link>
                              </div>
                              <div
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                data-tooltip-id='my-tooltip-inline'
                                data-tooltip-content='Download Images'
                              >
                                {' '}
                                <FontAwesomeIcon icon={faDownload} />
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

export {TablesWidget10}
