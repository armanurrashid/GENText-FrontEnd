import {useEffect, useState} from 'react'
import './Upload.css'
import {Document, pdfjs} from 'react-pdf'
import {getAuth, useAuth} from '../../modules/auth'
import {useNavigate} from 'react-router-dom'

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
const btnClass = 'd-flex justify-content-center mt-5'

const Upload: React.FC = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  let sameFileRequest: number | null = null
  const token = getAuth()
  const {currentUser} = useAuth()

  const processfile = async () => {
    try {
      const formData = new FormData()

      if (file) {
        const basePath = 'C:/Users/User/Downloads/'
        const fullPath = `${basePath}${file.name}`
        formData.append('file', file)
      }

      setLoading(true)

      const response = await fetch(`http://localhost:8000/api/ocr/pdf2text/${currentUser?.id}/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token?.api_token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 406) {
          sameFileRequest = 406
        }
        setLoading(false)
      }

      if (response.ok) {
        const responseData = await response.json()
        console.log('File uploaded successfully:', responseData.id)
        setSecondApiCall(responseData.id);
      }
    } catch (error) {
      console.error('Error processing file:', error)
    } 
  }

  const [secondApiCall, setSecondApiCall] = useState<boolean>(false)

  useEffect(() => {
    if (secondApiCall) {
      const fetchData = async () => {
        try {
          console.log(secondApiCall)
          const response = await fetch(`http://localhost:8000/api/file/detail/${secondApiCall}/`, {
            headers: {
              Authorization: `Bearer ${token?.api_token}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            const dataParam = encodeURIComponent(JSON.stringify(data))
            console.log(dataParam)
            navigate(`/process?data=${dataParam}`)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }finally {
          setLoading(false)
        }
      }

      fetchData()
    }
  }, [secondApiCall, token])

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files ? event.currentTarget.files[0] : null
    setFile(selectedFile)
    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer | null
        if (arrayBuffer) {
          const typedArray = new Uint8Array(arrayBuffer)
          pdfjs.getDocument(typedArray).promise.then((pdf) => {
            setNumPages(pdf.numPages)
          })
        }
      }
      reader.readAsArrayBuffer(selectedFile)
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
    setFile(null)
  }

  return (
    <main>
      <div className={`drag-area ${file ? 'active' : ''} bg-white`}>
        {file ? (
          <div></div>
        ) : (
          <div className='icon'>
            <i className='fas fa-cloud-upload-alt text-primary' style={{fontSize: '50px'}}></i>
          </div>
        )}
        <header style={{fontWeight: file ? 'normal' : 'bold'}}>
          {file ? file.name : <strong>Drag & Drop to Upload PDF File</strong>}
        </header>
        <span className='fs-3'>
          {file ? (
            sameFileRequest === 406 ? (
              <div>
                <p className='text-danger'>There is already a file with the same name. </p>
                <div className='d-flex justify-content-center mt-5'>
                  <div className={btnClass}>
                    <button className='bg-primary btn-lg mx-5 w-100'>Continue</button>
                    <button
                      type='button'
                      id='kt_login_signup_form_cancel_button'
                      className='btn btn-lg btn-light-primary w-100 mb-0 mx-5'
                    >
                      Cancel
                    </button>
                  </div>
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
                  <div className={btnClass}>
                    <button className='bg-primary' onClick={() => processfile()}>
                      {!loading && <span className='indicator-label'>Process</span>}
                      {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <b>OR</b>
          )}
        </span>
        {file ? (
          <button onClick={cancelFile} className='cancel-button bg-white'>
            <i className='fas fa-times text-danger'></i>
          </button>
        ) : (
          <button onClick={browseFile} className='browse-button'>
            Browse PDF File
          </button>
        )}
        <input type='file' accept='.pdf' hidden id='file-input' onChange={handleFile} />
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
