import {useState} from 'react'
import './Upload.css'
import {Document, pdfjs} from 'react-pdf'
import {getAuth, useAuth} from '../../modules/auth'
import {useNavigate} from 'react-router-dom'
// import { Process } from '../process-builder/Process'
// import {Tooltip} from 'react-tooltip'

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const Upload: React.FC = () => {
  const dataToPass = (fileId: string, fileName: string, numPages: string, fileSize: number) => ({
    key1: fileId,
    key2: fileName,
    key3: numPages,
    key4: fileSize,
  })
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [fileSize, setfileSize] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [sameFileRequest, setSameFileRequest] = useState<number | null>(null)
  const token = getAuth()
  const {currentUser} = useAuth()

  const processfile = async (url) => {
    try {
      const formData = new FormData()
      setLoading(true)
      if (file) {
        const basePath = 'C:/Users/User/Downloads/'
        const fullPath = `${basePath}${file.name}`
        formData.append('file', file)
      }

      const response = await fetch(`${url}${currentUser?.id}/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token?.api_token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 406) {
          setSameFileRequest(406)
        }
        setLoading(false)
      }

      if (response.ok) {
        const responseData = await response.json()
        setLoading(false)
        // const size = formatBytes(file?.size)
        // console.log("Arman",size)
        // setfileSize(Number(size))
        // console.log({fileSize})
        const stateData = dataToPass(
          responseData.id,
          file?.name || 'DefaultFileName',
          `${numPages ?? 0}`,
          Number(formatBytes(file?.size))
        )
        navigate('/process', {state: stateData})
      }
    } catch (error) {
      console.error('Error processing file:', error)
    }
  }

  const browseFile = () => {
    document.getElementById('file-input')?.click()
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please select a PDF file.')
    }
  }

  const cancelFile = () => {
    setSameFileRequest(null)
    setFile(null)
  }

  return (
    <main>
      <div className={`drag-area ${file ? 'active' : ''} bg-white text-break`}>
        {file ? (
          <div></div>
        ) : (
          <div className='icon'>
            <i className='fas fa-cloud-upload-alt text-primary' style={{fontSize: '50px'}}></i>
          </div>
        )}
        <header style={{fontWeight: file ? 'normal' : 'bold'}}>
          {file ? (
            <p style={{wordBreak: 'break-word', fontSize: '15px', padding: '0px 8px'}}>
              {file.name}
            </p>
          ) : (
            <strong>Drag & Drop to Upload PDF File</strong>
          )}
        </header>
        <span className='fs-3'>
          {file ? (
            sameFileRequest === 406 ? (
              <div>
                <p className='text-danger'>There is already a file with the same name. </p>
                <div className='text-center'>
                  <button
                    className='btn btn-primary'
                    type='submit'
                    id='kt_password_reset_submit'
                    onClick={() => processfile('http://localhost:8000/api/ocr/pdf2text/force/')}
                  >
                    {!loading && <span className='indicator-label'>Continue</span>}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className='text-muted d-flex mt-3'>
                  <div className='pe-5'>
                    Pdf Size:{' '}
                    {file
                      ? (Number(formatBytes(file.size || 0)) > 1024)
                        ? `${(file.size || 0) / 1024} MB`
                        : `${formatBytes(file.size || 0)} KB`
                      : 'N/A'}
                  </div>
                  <div className='ps-5'>Total Page: {numPages}</div>
                  {file && (
                    <Document file={file} onLoadSuccess={(info) => setNumPages(info.numPages)} />
                  )}
                </div>
                <div className='d-flex justify-content-center mt-5'>
                  <div>
                    <button
                      className='btn btn-primary'
                      type='submit'
                      id='kt_password_reset_submit'
                      onClick={() => processfile('http://localhost:8000/api/ocr/pdf2text/')}
                    >
                      {!loading && <span className='indicator-label'>Process</span>}
                      {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <b style={{color: '#555555'}}>OR</b>
          )}
        </span>
        {file ? (
          <button onClick={cancelFile} className='cancel-button bg-white'>
            <i className='fas fa-times text-danger'></i>
          </button>
        ) : (
          <button
            type='submit'
            id='kt_password_reset_submit'
            onClick={browseFile}
            className='btn btn-primary'
          >
            <span className='indicator-label'>Browse PDF File</span>
          </button>
        )}
        <input type='file' accept='.pdf' hidden id='file-input' onChange={handleFile} />
      </div>
      {/* <Process sourceClass="Upload" /> */}
    </main>
  )
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const kilobyte = 1024
  const decimalValue = decimals < 0 ? 0 : decimals
  // const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const result = Math.floor(Math.log(bytes) / Math.log(kilobyte))
  return parseFloat((bytes / Math.pow(kilobyte, result)).toFixed(decimalValue))
}
export {Upload}
