import {useEffect, useState, useRef} from 'react'
import {Document, pdfjs} from 'react-pdf'
import {useNavigate} from 'react-router-dom'
import {getAuth, useAuth} from '../../modules/auth'
import './Upload.css'
import {URL} from '../../modules/auth/core/_requests'
import {useSelector} from 'react-redux'
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const Upload: React.FC = () => {
  // const fileInputRef = useRef<HTMLInputElement>(null)
  var {command} = useSelector((state: {voicecommand: {command: string[]}}) => state.voicecommand)
  const dataToPass = (
    fileId: string,
    fileName: string,
    numPages: string,
    fileSize: String,
    pdfLocation: string
  ) => ({
    key1: fileId,
    key2: fileName,
    key3: numPages,
    key4: fileSize,
    key5: pdfLocation,
  })
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [sameFileRequest, setSameFileRequest] = useState<number | null>(null)
  const token = getAuth()
  const {currentUser} = useAuth()
  const [renderPage, setRenderPage] = useState(false);
  console.log(command)
  console.log(command[command.length - 1])

const commandActions = [
  {keyword: 'process', action: () => uploadFile(`${URL}/api/ocr/upload-pdf/`)},
  {keyword: 'browse pdf', action: () => browseFile()},
  {keyword: 'continue', action: () => uploadFile(`${URL}/api/ocr/upload-pdf/force/`)},
  {keyword: 'cancel file', action: () => cancelFile()}
];

function executeCommand(command) {
    const matchingAction = commandActions.find(action => command.includes(action.keyword));
    if (matchingAction) {
        matchingAction.action();
    }
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (command) {
          const lastCommand = command[command.length - 1]
          executeCommand(lastCommand);
          // if (lastCommand.includes('process')) {
          //   uploadFile(`${URL}/api/ocr/upload-pdf/`)
          // } else if (lastCommand.includes('browse pdf')) {
          //   browseFile()
          // } else if (lastCommand.includes('continue')) {
          //   uploadFile(`${URL}/api/ocr/upload-pdf/force/`)
          // } else if (lastCommand.includes('cancel file')) {
          //   cancelFile()
          // }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchData()
  }, [command])

  const uploadFile = async (url) => {
    try {
      const formData = new FormData()
      setLoading(true)
      if (file) {
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
        await pdf2image(responseData.id, responseData.pdfLocation)
      }
    } catch (error) {
      console.error('Error processing file:', error)
    }
  }

  const pdf2image = async (fileID, pdfLocation) => {
    try {
      setLoading(true)

      const response = await fetch(`${URL}/api/ocr/pdf2image/${fileID}/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token?.api_token}`,
        },
      })

      if (!response.ok) {
        alert('PDF to image unsuccessful')
        setLoading(false)
      }

      if (response.ok) {
        await image2text(fileID, pdfLocation)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error processing file:', error)
    }
  }

  const image2text = async (fileID, pdfLocation) => {
    try {
      setLoading(true)
      const response = await fetch(`${URL}/api/ocr/image2text/${fileID}/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token?.api_token}`,
        },
      })

      if (!response.ok) {
        alert('PDF to image unsuccessful')
        setLoading(false)
      }

      if (response.ok) {
        const responseData = await response.json()
        setLoading(false)
        const stateData = dataToPass(
          fileID,
          file?.name || 'DefaultFileName',
          `${numPages ?? 0}`,
          formatBytes(file?.size) as String,
          pdfLocation
        )
        navigate('/process', {state: stateData})
      }
    } catch (error) {
      console.error('Error processing file:', error)
    }
  }

  const browseFile = () => {
    setRenderPage(true)
    document.getElementById('file-input')?.click()
  }

  var myButton = document.getElementById('file-input')
  const simulateKeyPress = ()=> {
    if (myButton) {
      var event = new KeyboardEvent('keypress', {
        key: 'Enter',
        keyCode: 13,
      })
      myButton.dispatchEvent(event)
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please select a PDF file.')
    }
  }

  const anc = () => {
    console.log("cknc")
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
                    onClick={() => uploadFile(`${URL}/api/ocr/upload-pdf/force/`)}
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
                  <div className='pe-5'>Pdf Size: {file ? formatBytes(file.size || 0) : 'N/A'}</div>
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
                      onClick={() => uploadFile(`${URL}/api/ocr/upload-pdf/`)}
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
            type='button'
            id='mybutton'
            onClick={browseFile}
            className='btn btn-primary browsePdf'
          >
            <span className='indicator-label'>Browse PDF File</span>
          </button>
        )}
        <input
          type='file'
          accept='.pdf'
          hidden
          id='file-input'
          onChange={handleFile}
        />
        {/* <button onClick={anc} id='hiddenButton'>ss</button> */}
      </div>
    </main>
  )
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
export {Upload}