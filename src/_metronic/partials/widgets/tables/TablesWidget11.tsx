import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faEye } from '@fortawesome/free-solid-svg-icons';
import { getAuth, useAuth } from '../../../../app/modules/auth';

type Props = {
  className: string;
};

// interface FileData {
//   id : number;
//   pdf_file_name: string;
//   file_location: string;
//   uploaded_date: Date;
//   upload_status: number;
//   total_page: number;
//   total_size: number;
// }

const getStatusStyle = (status: string): string => {
  switch (status) {
    case 'complete':
      return 'text-success';
    case 'incomplete':
      return 'text-danger';
    case 'pending':
      return 'text-primary';
    default:
      return '';
  }
};

// const data: FileData[] = [
//   {
//     fileName: 'Robotics for kids.pdf', fileSize: '12 MB' , uploadDate: '07-Dec-2023', totalPage: 20, status: 'Processing',
//     action: ( <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'> <FontAwesomeIcon icon={faEye} /> </a> ),
//   },
//   {
//     fileName: 'Robotics Level2.pdf' , fileSize: '14 MB', uploadDate: '05-Dec-2023', totalPage: 40, status: 'Unsuccessful',
//     action: ( <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'> <FontAwesomeIcon icon={faEye} /> </a> ),
//   },
//   {
//     fileName: 'Tappware.pdf' , fileSize: '28 MB', uploadDate: '04-Dec-2023', totalPage: 92, status: 'Successful',
//     action: ( <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'> <FontAwesomeIcon icon={faEye} /> </a> ),
//   },
//   {
//     fileName: 'New Document.pdf', fileSize: '57 MB', uploadDate: '03-Dec-2023', totalPage: 324, status: 'Successful',
//     action: ( <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'> <FontAwesomeIcon icon={faEye} /> </a> ),
//   },
//   {
//     fileName: 'Document.pdf' , fileSize: '98 MB', uploadDate: '01-Dec-2023', totalPage: 234, status: 'Unsuccessful',
//     action: ( <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'> <FontAwesomeIcon icon={faEye} /> </a> ),
//   },
// ];

const TablesWidget11: React.FC<{className:any, tableData:any}> = ({ className , tableData }) => {
  console.log(tableData)
  const action= ( <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'> <FontAwesomeIcon icon={faEye} /> </a> )
  return (
    <div className={`card ${className}`}>
      {/* <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Recent Activities</span>
        </h3>
      </div> */}
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-100px text-center ' style={{ width: '40%' }}> File Name </th>
                <th className='min-w-100px text-center ' style={{ width: '20%' }}> Upload Date </th>
                <th className='min-w-100px text-center ' style={{ width: '20%' }}> Total Page </th>
                <th className='min-w-100px text-center ' style={{ width: '20%' }}> Status </th>
                <th className='min-w-100px text-center ' style={{ width: '20%' }}> Actions </th>
              </tr>
            </thead>
            <tbody>

              {
                tableData ? (
                  tableData.map((file, index) => (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            <div>
                              <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: '27px', color: '#F1416C' }} />
                            </div>
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>{file['pdf_file_name']} </a>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>{file['total_size']}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className='fw-semibold d-block fs-7 text-center fw-bold'>{file['uploaded_date']}</span>
                      </td>
                      <td className='text-center'>
                        <div className='d-flex flex-column w-100 me-2 fw-bold'> <span>{file['total_page']}</span></div>
                      </td>
                      <td className={`text-center ${getStatusStyle(file['upload_status'])}`}>
                        <div className='d-flex flex-column w-100 me-2 fw-bold'> <span>{(file['upload_status']==='complete')?"Successful":(file['upload_status']==='incomplete')?"Unsuccessful":"Processing"}</span></div>
                      </td>
                      <td>
                        <div className='d-flex justify-content-center flex-shrink-0'>{action}</div>
                      </td>
                    </tr>
                  )
                  )
                ):null
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget11 };