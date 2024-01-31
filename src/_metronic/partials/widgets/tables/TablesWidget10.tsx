import React, { useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faDownload} from '@fortawesome/free-solid-svg-icons'
import {Tooltip} from 'react-tooltip'
import pdf_icon from '../../../assets/images/pdf.svg'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { getAuth } from '../../../../app/modules/auth'

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
  const date = new Date(inputDate)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const formattedDate = `${day}-${month}-${year}`
  return formattedDate
}

const formatTime = (inputTime) => {
  const time = new Date(`2000-01-01T${inputTime}`)
  return time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
}

const TablesWidget10: React.FC<{className: any; tableData: any}> = ({className, tableData}) => {
  const {command} = useSelector((state: {voicecommand: {command: string[]}}) => state.voicecommand)
  const navigate = useNavigate()
  let size = "N/A"
  const dataToPass = (fileId: string, fileName: string, filePage: string, fileSize: string, fileLocation:string) => ({
    key1: fileId,
    key2: fileName,
    key3: filePage,
    key4: fileSize,
    key5: fileLocation,
  })

  const commandRoutes = [
    {prefix: 'open', route: '/pdfView'},
    {prefix: 'view', route: '/process'}
  ];
  
  function processCommand(command) {
    const matchingRoute = commandRoutes.find(route => command.startsWith(route.prefix));
    if (matchingRoute) {
        processFile(command, matchingRoute.route);
    }
  }

  function formatFileName(fileName) {
    const formattedFileName = fileName
      .replace(/\.[^.]+$/, '')
      .replace(/\d+[_/.\-]+/g, ' ')
      .replace(/_/g, ' ')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    return formattedFileName+".pdf"
  }

  const processFile = (lastCommand, navigationPath) => {
    const fileName = lastCommand.substr(5);
    const fileNameWithPdf = fileName.toLowerCase() + '.pdf';
    tableData.forEach((file, index) => {
      const formattedName = formatFileName(file['pdf_file_name']);
      if (formattedName.toLowerCase() === fileNameWithPdf) {
        const size = SizeCalculator(file['total_size']);
        navigate(navigationPath, {
          state: dataToPass(
            file['id'],
            file['pdf_file_name'],
            file['total_page'],
            size,
            file['file_location']
          ),
        });
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(command[command.length - 1])
      try {
        if (command) {
          const lastCommand = command[command.length - 1]
          processCommand(lastCommand);
          // if (lastCommand.startsWith('open')) {
          //   processFile(lastCommand, '/pdfView');
          // } else if (lastCommand.startsWith('view')) {
          //   processFile(lastCommand, '/process');
          // }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchData()
  }, [command])

  const fetchData = async (link) => {
    const token = getAuth();
    try {
      const response = await fetch(link, {
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_file.zip';
        document.body.appendChild(a);
        a.click();
  
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Error downloading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
  }
}

  const downloadImages = (url) => {
    const extractedPortion = url?.substring(url.indexOf('media'));
    const link = `${URL}/${extractedPortion}images.zip`;
    fetchData(link);
  };

  return (
    <div className={`card ${className}`}>
      <Tooltip
        id='my-tooltip-inline'
        className='text-dark fw-bold fs-8'
        style={{backgroundColor: '#B8E2F2'}}
      />
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
                <th className='min-w-100px text-center ' style={{width: '10%'}}>
                  {' '}
                  Upload Date{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '10%'}}>
                  {' '}
                  Upload Time{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '10%'}}>
                  {' '}
                  Total Page{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '20%'}}>
                  {' '}
                  Status{' '}
                </th>
                <th className='min-w-100px text-center ' style={{width: '10%'}}>
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
                              <img src={pdf_icon} alt='' style={{width: '30px'}} />
                            </div>
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <Link
                              to='/pdfView'
                              state={dataToPass(
                                file['id'],
                                file['pdf_file_name'],
                                file['total_page'],
                                file['total_size'],
                                file['file_location']
                              )}
                              className='text-dark fw-bold text-hover-primary fs-6'
                              data-tooltip-id='my-tooltip-inline'
                              data-tooltip-content='View Pdf'
                            >
                              {file['pdf_file_name']}{' '}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {size = SizeCalculator(file['total_size'])}
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
                      <td className={`text-center ${getStatusStyle(file['extraction_status'])}`}>
                        <div className='d-flex flex-column w-100 me-2 fw-bold'>
                          {' '}
                          <span>
                            {file['extraction_status'] === 'complete'
                              ? 'Text Extraction Successful'
                              : file['extraction_status'] === 'incomplete'
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
                            <div className='d-flex justify-content-center'>
                              <div
                                className='btn btn-icon btn-bg-light btn-sm me-1'
                                data-tooltip-id='my-tooltip-inline'
                                data-tooltip-content='View Output'
                              >
                                {' '}
                                <Link
                                  to='/process'
                                  state={dataToPass(
                                    file['id'],
                                    file['pdf_file_name'],
                                    file['total_page'],
                                    size,
                                    file['file_location']
                                  )}
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </Link>
                              </div>
                              <div
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                data-tooltip-id='my-tooltip-inline'
                                data-tooltip-content='Download Images'
                                onClick={()=>downloadImages(file['file_location'])}
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

function SizeCalculator(bytes){
  if (bytes<1024) return bytes+" KB"
  return (bytes/1024).toFixed(2)+" MB"
}
export {TablesWidget10}
