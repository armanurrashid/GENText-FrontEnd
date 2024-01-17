import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import './PdfView.css'
import {Viewer, Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import { URL } from '../../modules/auth/core/_requests'
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
  let pdfLocation: string | null = null
  try {
    const fileState = location.state
    fileId = fileState ? fileState.key1 : null
    filename = fileState ? fileState.key2 : null
    pdfLocation = fileState ? fileState.key5 : null
  } catch (error) {
    console.error('Error decoding URI component:', error)
  }

  const [viewPdf, setViewPdf] = useState<string | null>(pdfLocation)
  const fileType = ['application/pdf']
  const extractedPortion = pdfLocation?.substring(pdfLocation.indexOf("media"));
  // console.log(extractedPortion)
  const newplugin = defaultLayoutPlugin()
  return (
    <div className='App'>
      <div className='container '>
        <div className='pdf-container'>
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
            {viewPdf && <Viewer fileUrl={`${URL}${extractedPortion}`} plugins={[newplugin]} />}
            {!viewPdf && <>No PDF</>}
          </Worker>
        </div>
      </div>
    </div>
  )
}

export {PdfView}
