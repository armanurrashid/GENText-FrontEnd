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
  } catch (error) {
    console.error('Error decoding URI component:', error)
  }

  const [viewPdf, setViewPdf] = useState<string | null>("https://arxiv.org/pdf/1903.02895.pdf");
  const fileType = ['application/pdf']

  const newplugin = defaultLayoutPlugin()
  return (
    <div className='App'>
      <div className='container '>
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
