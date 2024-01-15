import {FC, useState, useEffect, useRef} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './Process.css'
// import {useNavigate} from 'react-router-dom'
import pdf_icon from '../../../_metronic/assets/images/pdf.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import '../../../../src/_metronic/partials/layout/activity-drawer/ActivityDrawer.css'
import {getAuth} from '../../modules/auth'
import { URL } from '../../modules/auth/core/_requests'

const Process: FC = () => {
  const dataToPass = (
    fileId: string | null,
    fileName: string | null,
    filePage: string | null,
    fileSize: string | null,
    fileLocation: string | null,
  ) => ({
    key1: fileId,
    key2: fileName,
    key3: filePage,
    key4: fileSize,
    key5: fileLocation,
  })
  const token = getAuth()
  const location = useLocation()
  interface ProcessData {
    text: string
  }

  const [data, setData] = useState<ProcessData[] | null>(null)
  let fileId: string | null = null
  let fileName: string | null = null
  let filePage: string | null = null
  let fileSize: string | null = null
  let fileLocation: string | null = null
  try {
    const fileState = location.state
    fileId = fileState ? fileState.key1 : null
    fileName = fileState ? fileState.key2 : null
    filePage = fileState ? fileState.key3 : null
    fileSize = fileState ? fileState.key4 : null
    fileLocation = fileState ? fileState.key5 : null
  } catch (error) {
    console.error('Error decoding URI component:', error)
  }

  const [selectedText, setSelectedText] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [allImg, setAllImg] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/api/file/detail/${fileId}/`, {
          headers: {
            Authorization: `Bearer ${token?.api_token}`,
          },
        })

        if (response.ok) {
          const result = await response.json()
          setData(result)
          const imageLocations = result.map(page => page.image_location);
          setAllImg(imageLocations)
          setSelectedText(result[0].text)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
      }
    }
    fetchData()
  }, [])

  const handleImageClick = (index: number) => {
    setSelectedImage(allImg[index])
    if (data) {
      setSelectedText(data[index].text)
    }
  }

  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({x: 0, y: 0})
  const imageref = useRef<HTMLImageElement>(null)

  const handleZoomIn = () => {
    if (scale < 2) {
      setScale(scale + 0.2)
    }
  }

  const handleZoomOut = () => {
    if (scale > 0.8) {
      setScale(Math.max(scale - 0.2, 0))
    }
  }

  useEffect(() => {
    const image = imageref.current
    let isDragging = false
    let prevPosition = {x: 0, y: 0}

    const handleMouseDown = (e) => {
      isDragging = true
      prevPosition = {x: e.clientX, y: e.clientY}
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevPosition.x
      const deltaY = e.clientY - prevPosition.y
      prevPosition = {x: e.clientX, y: e.clientY}
      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }))
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    image?.addEventListener('mousedown', handleMouseDown)
    image?.addEventListener('mousemove', handleMouseMove)
    image?.addEventListener('mouseup', handleMouseUp)

    return () => {
      image?.removeEventListener('mousedown', handleMouseDown)
      image?.removeEventListener('mousemove', handleMouseMove)
      image?.removeEventListener('mouseup', handleMouseUp)
    }
  }, [imageref, scale])
  return (
    <div style={{width: '100%', maxWidth: '1500px'}}>
      <div className='position-relative' id='kt_activities_body'>
        <div
          id='kt_activities_scroll'
          className='position-relative scroll-y me-n5 pe-5'
          data-kt-scroll='true'
          data-kt-scroll-height='auto'
          data-kt-scroll-wrappers='#kt_activities_body'
          data-kt-scroll-dependencies='#kt_activities_header, #kt_activities_footer'
          data-kt-scroll-offset='5px'
        >
          <div className='fileInfo'>
            <div className='me-3 d-flex'>
              <img src={pdf_icon} alt='' style={{width: '30px'}} />
            </div>
            <div
              className='fw-bold fs-6 pb-0 d-flex me-5'
              style={{wordBreak: 'break-word', alignItems: 'center'}}
            >
              <Link
                to='/pdfView'
                state={dataToPass(fileId, fileName, filePage, fileSize, fileLocation)}
                className='text-dark fw-bold text-hover-primary fs-6'
              >
                {fileName}{' '}
              </Link>
            </div>
            <div className='mx-5 d-flex text-muted fw-semibold d-block fs-6'>Page: {filePage} </div>
            <div className='mx-5 '>
              <span className='text-muted fw-semibold d-block fs-6'>
                {fileSize? fileSize: "N/A"}
              </span>
            </div>
          </div>
          <hr className='mb-0' />
          <div className='d-flex justify-content-center mb-5 mt-0'>
            <div className='allImageContainer'>
              {allImg.map((img, index) => (
                <div key={index} className='imageContainer'>
                  <img
                    key={index}
                    src={img}
                    onClick={() => handleImageClick(index)}
                    alt=''
                    width={80}
                    height={80}
                    style={img === selectedImage ? {border: '2px solid red', height: '70px'} : {}}
                  />
                  <div className='imageNumber'>{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
          <div className='row row-cols-1 row-cols-xl-2 row-cols-lg-1 row-cols-md-1 g-4 pt-0 pb-0'>
            <div
              className='col d-flex justify-content-center mb-5'
              style={{
                borderRadius: '10px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className='btn-container'>
                <button className='zoominout' onClick={handleZoomIn} disabled={scale === 2}>
                  <span>
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </button>
                <button className='zoominout' onClick={handleZoomOut} disabled={scale === 0}>
                  <span>
                    <FontAwesomeIcon icon={faMinus} />
                  </span>
                </button>
              </div>

              <img
                ref={imageref}
                src={selectedImage}
                alt='Upper Left'
                style={{
                  width: '400px',
                  height: '400px',
                  cursor: 'move',
                  transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                  transition: 'transform 0.1s ease-in-out',
                }}
                draggable={false}
              />
            </div>
            <div
              className='col solluclass'
              style={{overflow: 'auto', maxHeight: '400px', whiteSpace: 'pre-line', fontFamily: 'SolaimanLipi'}}
            >
              <p style={{color: 'black', whiteSpace: 'pre-line'}}>{selectedText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Process}