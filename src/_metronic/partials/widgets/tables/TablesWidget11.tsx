import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faDownload} from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom'
import clsx from 'clsx'
import {Tooltip} from 'react-tooltip'
import pdf_icon from '../../../assets/images/pdf.svg'
import './TableWidget.css'
import {useSelector} from 'react-redux'

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
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
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

const TablesWidget11: React.FC<{className: any; tableData: any}> = ({className, tableData}) => {
  const navigate = useNavigate()
  const {command} = useSelector((state: {voicecommand: {command: string[]}}) => state.voicecommand)
  const [query, setQuery] = useState('')
  const [entriesPerPage, setEntriesPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  var totalPages = Math.ceil(tableData.length / entriesPerPage)
  
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

const commandActions = [
   {prefix: 'search', action: (command) => { setQuery(command.substr(7));}},
   {prefix: 'open', action: (command) => { processFile(command, '/pdfView');}},
   {prefix: 'view', action: (command) => { processFile(command, '/process');}}
];

function executeCommand(command) {
    const matchingAction = commandActions.find(action => command.startsWith(action.prefix));
    if (matchingAction) {
        matchingAction.action(command);
    }
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
          executeCommand(lastCommand);
          // if (lastCommand.startsWith('search')) {
          //   setQuery(lastCommand.substr(7))
          // } 
          // else if (lastCommand.startsWith('open')) {
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const dataToPass = (
    fileId: string,
    fileName: string,
    filePage: string,
    fileSize: string,
    fileLocation: string
  ) => ({key1: fileId, key2: fileName, key3: filePage, key4: fileSize, key5: fileLocation})

  let size = 'N/A'
  const filteredData = tableData
    ? tableData.filter((file) =>
        Object.values(file).some(
          (field) => typeof field === 'string' && field.toLowerCase().includes(query.toLowerCase())
        )
      )
    : '0'
  totalPages = Math.ceil(filteredData.length / entriesPerPage)
  console.log(filteredData)

  return (
    <div className={`card ${className}`}>
      <Tooltip
        id='my-tooltip-inline'
        className='text-dark fw-bold fs-8'
        style={{backgroundColor: '#B8E2F2'}}
      />
      <div className='card-body py-3'>
        <div className='mt-2'>
          <div className='table_header'>
            <div className='d-flex align-items-center'>
              <h6 className='mb-0'>Show </h6>
              <select
                className='form-select mx-2'
                onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
                value={entriesPerPage}
                style={{flex: '1', fontWeight: 'bold'}}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <h6 className='mb-0'>entries </h6>
            </div>

            <div className='d-flex flex-row'>
              <input
                placeholder='Search'
                className='searchInput'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                {/* <th className='min-w-100px text-center ' style={{width: '5%'}}>
                  {' '}
                  SL No{' '}
                </th> */}
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
                ? tableData
                    .filter((file) =>
                      Object.values(file).some(
                        (field) =>
                          typeof field === 'string' &&
                          field.toLowerCase().includes(query.toLowerCase())
                      )
                    )
                    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                    .slice(0, entriesPerPage)
                    .map((file, index) => (
                      <tr key={index}>
                        {/* <td className=''>{file['id']}</td> */}
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
                                  size,
                                  file['file_location']
                                )}
                                className='text-dark fw-bold text-hover-primary fs-6'
                                data-tooltip-id='my-tooltip-inline'
                                data-tooltip-content='View Pdf'
                              >
                                {file['pdf_file_name']}{' '}
                              </Link>
                              <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {(size = SizeCalculator(file['total_size']))}
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
                                <div className='btn btn-icon btn-bg-light btn-sm me-1'>
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
        <div className='d-flex justify-content-end mb-2'>
          {totalPages > 1 ? (
            <ul className='pagination'>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className={`page-link px-3 py-2 ${
                    currentPage === 1 ? 'text-secondary fw-bold' : 'text-primary fw-bold'
                  }`}
                  tabIndex={-1}
                  onClick={handlePrevPage}
                >
                  {'Prev'}
                </button>
              </li>
              <li className='page-item'>
                <p className='page-link px-3 py-2 fw-bold'>
                  {currentPage} of {totalPages} <span className='sr-only'>(current)</span>
                </p>
              </li>
              <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                <button
                  className={`page-link px-3 py-2 ${
                    currentPage >= totalPages ? 'text-secondary fw-bold' : 'text-primary fw-bold'
                  }`}
                  onClick={handleNextPage}
                >
                  {'Next'}
                </button>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}
function SizeCalculator(bytes) {
  if (bytes < 1024) return bytes + ' KB'
  return (bytes / 1024).toFixed(2) + ' MB'
}
export {TablesWidget11}
