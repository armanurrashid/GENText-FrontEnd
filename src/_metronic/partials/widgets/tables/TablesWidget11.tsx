import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faDownload} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {Tooltip} from 'react-tooltip'
import pdf_icon from '../../../assets/images/pdf.svg'
// import { Process } from '../../../../app/pages/process-builder/Process'
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

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

const formatTime = (inputTime) => {
  const time = new Date(`2000-01-01T${inputTime}`);
  return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};

const TablesWidget11: React.FC<{className: any; tableData: any}> = ({className, tableData}) => {
  const dataToPass = (fileId: string, fileName: string, filePage: string, fileSize: string) => ({key1: fileId, key2: fileName, key3: filePage, key4: fileSize})
  let size = "N/A"
  return (
    <div className={`card ${className}`}>
      <Tooltip
        id='my-tooltip-inline'
        className='text-dark fw-bold fs-8'
        style={{backgroundColor: '#B8E2F2'}}
      />
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-100px text-center ' style={{width: '40%'}}>
                  {' '}
                  File Name{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '13%'}}>
                  {' '}
                  Upload Date{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '12%'}}>
                  {' '}
                  Upload Time{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '10%'}}>
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
                            <Link
                              to='/pdfView'
                              state={dataToPass(file['id'], file['pdf_file_name'], file['total_page'],size)}
                              className='text-dark fw-bold text-hover-primary fs-6'
                              data-tooltip-id='my-tooltip-inline'
                              data-tooltip-content='View Pdf'
                            >
                              {file['pdf_file_name']}{' '}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                              {size=SizeCalculator(file['total_size'])}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className='fw-semibold d-block fs-7 text-center fw-bold'>
                        {formatDate(file['uploaded_date'])}
                        </span>
                      </td>
                      <td>
                        <span className='fw-semibold d-block fs-7 text-center fw-bold'>
                        {formatTime(file['uploaded_time'])}
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
                              <div className='btn btn-icon btn-bg-light btn-sm me-1'>
                                {' '}
                                <Link
                                  to='/process'
                                  state={dataToPass(file['id'], file['pdf_file_name'], file['total_page'],size)}
                                  data-tooltip-id='my-tooltip-inline'
                                  data-tooltip-content='View Output'
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
      {/* <Process sourceClass="Upload" /> */}
    </div>
  )
}
function SizeCalculator(bytes){
  if (bytes<1024) return bytes+" KB"
  return (bytes/1024).toFixed(2)+" MB"
}
export {TablesWidget11}
