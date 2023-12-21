import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import './PdfView.css'
import {Viewer, Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const PdfView: React.FC = () => {
  const location = useLocation()
  interface ProcessData {
    text: string
  }
  const [data, setData] = useState<ProcessData[] | null>(null)
  let fileId: string | null = null
  let filename: string | null = null
  try {
    const fileState = location.state
    fileId = fileState ? fileState.key1 : null
    filename = fileState ? fileState.key2 : null
    // console.log(fileId,filename)
  } catch (error) {
    console.error('Error decoding URI component:', error)
  }

//   const [pdfFile, setPDFFile] = useState<string | null>(null)
  const [viewPdf, setViewPdf] = useState<string | null>("https://arxiv.org/pdf/1903.02895.pdf");
  const fileType = ['application/pdf']

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let selectedFile = e.target?.files?.[0]
//     if (selectedFile) {
//       if (selectedFile && fileType.includes(selectedFile.type)) {
//         let reader = new FileReader()
//         reader.readAsDataURL(selectedFile)
//         reader.onload = (e) => {
//           setPDFFile(e.target?.result as string)
//         }
//       } else {
//         setPDFFile(null)
//       }
//     } else {
//       console.log('Please select')
//     }
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (pdfFile !== null) {
//       setViewPdf(pdfFile)
//     } else {
//       setViewPdf(null)
//     }
//   }
  const newplugin = defaultLayoutPlugin()
  return (
    <div className='App'>
      <div className='container '>
        {/* <form onSubmit={handleSubmit}>
          <input type='file' className='form-control' onChange={handleChange} />
          <button className='btn btn-success' type='submit'>
            View Pdf
          </button>
        </form> */}
        {/* <h2>View PDF</h2> */}
        <div className='pdf-container'>
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
            {viewPdf && <Viewer fileUrl={viewPdf} plugins={[newplugin]} />}
            {!viewPdf && <>No PDF</>}
          </Worker>
        </div>
      </div>
    </div>
  )
}

export {PdfView}
