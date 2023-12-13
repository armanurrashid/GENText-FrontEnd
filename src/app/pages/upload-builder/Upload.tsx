import React, {useState} from 'react'
import clsx from 'clsx'
import './Upload.css'
import {Document, pdfjs} from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
const itemClass = 'ms-1 ms-md-4'
const btnClass = 'd-flex justify-content-center mt-5'

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files ? event.currentTarget.files[0] : null
    setFile(selectedFile)

    // Get the number of pages
    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer | null
        // const typedArray = new Uint8Array(arrayBuffer)
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

  // const [file, setFile] = useState<File | null>(null)

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
            <div>
              <div className='text-muted d-flex mt-3'>
                <div className='pe-5'>Pdf Size:{file ? formatBytes(file.size || 0) : 'N/A'}</div>
                <div className='ps-5 '>Total Page: {numPages}</div>
                {file && (
                  <Document file={file} onLoadSuccess={(info) => setNumPages(info.numPages)} />
                )}
              </div>
              <div d-flex justify-content-center mt-5>
      
                  <div className={btnClass}>
                    <button className='bg-primary'>Process</button>
                  </div>
                
              </div>
            </div>
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
