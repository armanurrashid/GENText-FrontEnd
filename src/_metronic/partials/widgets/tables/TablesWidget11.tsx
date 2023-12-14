import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye} from '@fortawesome/free-solid-svg-icons'
import pdfIcon from '../../../assets/images/pdf.svg'
import nodata from '../../../assets/images/nodata.png'

type Props = {
  className: string
}

interface FileData {
  fileName: string
  fileSize: string
  uploadDate: string
  totalPage: number
  status: string
  action: JSX.Element
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

]

const TablesWidget11: React.FC<Props> = ({className}) => {
  const handleViewClick = (index: number) => {
    // Handle view click logic here
    console.log(`View clicked for item at index ${index}`)
  }
  const handleRemoveClick = (index: number) => {
    // Handle remove click logic here
    console.log(`Remove clicked for item at index ${index}`)
  }
  return (
    <div className={`card ${className}`}>
      <div className='card-body py-3'>
      {data.length > 0 ? (
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
                          <img src={pdfIcon} height='35px' alt='' />
                          {/* <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: '27px', color: '#F1416C' }} /> */}
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
                    <div className='d-flex justify-content-center flex-shrink-0'>{file.action}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : (
          <div>
            <div className='d-flex justify-content-center'>
            <img src={nodata} width="200px" alt="" />
          </div>
          <div>
            <h2 className='d-flex justify-content-center mt-4'>No History</h2>
          </div>
          </div>
        )}
      </div>
    </div>
  )
}

export {TablesWidget11}
