import {FC, useState, useEffect, useRef} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './Process.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import '../../../../src/_metronic/partials/layout/activity-drawer/ActivityDrawer.css'
import image1 from '../../../../src/_metronic/assets/images/img-1.jpg'
import image2 from '../../../../src/_metronic/assets/images/img-2.jpg'
import image3 from '../../../../src/_metronic/assets/images/img-3.jpg'
import image4 from '../../../../src/_metronic/assets/images/img-4.jpg'
import image5 from '../../../../src/_metronic/assets/images/img-5.jpg'
import image6 from '../../../../src/_metronic/assets/images/img-6.jpg'
import image7 from '../../../../src/_metronic/assets/images/img-7.jpg'
import image8 from '../../../../src/_metronic/assets/images/img-8.jpg'
import image9 from '../../../../src/_metronic/assets/images/img-9.jpg'
import {faFilePdf} from '@fortawesome/free-solid-svg-icons'
import {getAuth} from '../../modules/auth'

const Process: FC = () => {
  const dataToPass = (fileId: string | null, fileName: string | null) => ({key1: fileId, key2: fileName})
  const token = getAuth()
  const location = useLocation()
  interface ProcessData {
    text: string
  }

  const [data, setData] = useState<ProcessData[] | null>(null)
  let fileId: string | null = null
  let fileName: string | null = null
  try {
    const fileState = location.state
    fileId = fileState ? fileState.key1 : null
    fileName = fileState ? fileState.key2 : null
  } catch (error) {
    console.error('Error decoding URI component:', error)
  }

  const [selectedText, setSelectedText] = useState('')
  const [selectedImage, setSelectedImage] = useState(image1)
  const [allImg, setAllImg] = useState([
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log({fileId})
        const response = await fetch(`http://localhost:8000/api/file/detail/${fileId}/`, {
          headers: {
            Authorization: `Bearer ${token?.api_token}`,
          },
        })

        if (response.ok) {
          const result = await response.json()
          setData(result)
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
console.log(fileId)
console.log(fileName)
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
          <div className='d-flex'>
            <div className='ms-5 me-3'>
              <FontAwesomeIcon icon={faFilePdf} style={{fontSize: '18px', color: '#F1416C'}} />
            </div>
            <div className='fw-bold fs-6 pb-0' style={{wordBreak: 'break-word'}}>
              <Link
                to='/pdfView'
                state={dataToPass(fileId,fileName)}
                className='text-dark fw-bold text-hover-primary fs-6'
              >
                {fileName}{' '}
              </Link>
            </div>
            {/* <div className='fw-bold fs-6 pb-0' style={{wordBreak: 'break-word'}}>{filename}</div> */}
          </div>
          <hr />
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
              className='col'
              style={{overflow: 'auto', maxHeight: '400px', whiteSpace: 'pre-line'}}
            >
              <p style={{color: 'black', whiteSpace: 'pre-line'}}>{selectedText}</p>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
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
        </div>
      </div>
    </div>
  )
}

export {Process}
