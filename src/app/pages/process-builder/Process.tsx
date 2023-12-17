import {FC, useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
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

const Process: FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const dataParam = queryParams.get('data')
  const data = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null
  // console.log(data)
  // const [selectedImage, setSelectedImage] = useState(image1)
  const [selectedText, setSelectedText] = useState('');
  const [selectedImage, setSelectedImage] = useState(image1)
  const [allImg, setAllImg] = useState([
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image1, image2, image3, image4, image5, image6, image7 ])
    const handleImageClick = (index: number) => {
      setSelectedImage(allImg[index]);
      if (data && data[index]) {
        setSelectedText(data[index].text);
      }
    };
  // const [allImg, setAllImg] = useState<string[]>([])

  // useEffect(() => {
  //   if (data) {
  //     const imagePaths = data.map((item) => item.image_location);
  //     if (!areArraysEqual(imagePaths, allImg)) {
  //       setAllImg(imagePaths);
  //     }
  //   }
  // }, [data, allImg]);
  // function areArraysEqual(arr1, arr2) {
  //   if (arr1.length !== arr2.length) {
  //     return false;
  //   }

  //   for (let i = 0; i < arr1.length; i++) {
  //     if (arr1[i] !== arr2[i]) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  // let normalizedImagePath
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
          <div className='row row-cols-1 row-cols-xl-2 row-cols-lg-1 row-cols-md-1 g-4 pt-0 pb-0'>
            <div className='col d-flex justify-content-center mb-5'>
              <img src={selectedImage} alt='Upper Left' style={{width: '400px', height: '400px'}} />
            </div>
            <div className='col' style={{overflow: 'auto', maxHeight: '400px'}}>
              <p style={{color: 'black'}}>
              {selectedText}
              </p>
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
                          style={
                            img === selectedImage ? {border: '2px solid red', height: '70px'} : {}
                          }
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
