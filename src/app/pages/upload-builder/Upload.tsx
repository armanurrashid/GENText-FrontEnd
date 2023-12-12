import React, {useState} from 'react'
import clsx from 'clsx'
import './Upload.css'

const itemClass = 'ms-1 ms-md-4'
const btnClass = 'd-flex justify-content-center mt-5'

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)

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
                <div className='pe-5'>Pdf Size: 10MB</div>
                <div className='ps-5 '>Total Page: 682</div>
              </div>
              <div
                className={clsx('app-navbar-item', itemClass)}
                d-flex
                justify-content-center
                mt-5
              >
                <div id='kt_activities_toggle' className={btnClass}>
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

export {Upload}
