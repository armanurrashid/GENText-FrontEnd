import {FC, useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import '../../../../src/_metronic/partials/layout/activity-drawer/ActivityDrawer.css'
import image1 from '../../../../src/_metronic/assets/images/img-1.jpg'
import image4 from '../../../../src/_metronic/assets/images/img-4.jpg'
import image5 from '../../../../src/_metronic/assets/images/img-5.jpg'
import image6 from '../../../../src/_metronic/assets/images/img-6.jpg'

// import { KTIcon } from '../../../_metronic/helpers'

const Process: FC = () => {
  // const location = useLocation()
  // const {data} = location.state
  // console.log("Hello")
  // console.log(data)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const dataParam = queryParams.get('data')
  const data = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null
  console.log(data)
  const [selectedImage, setSelectedImage] = useState(image1)
  const [allImg, setAllImg] = useState([
    image1,
    image4,
    image5,
    image6,
    image1,
    image4,
    image5,
    image6,
    image1,
    image4,
    image5,
    image6,
    image1,
    image4,
    image5,
    image6,
  ])

  useEffect(() => {
    // Log data when the component mounts
    console.log('Component Mounted with data:', data)

    // If data is available, log specific properties
    if (data) {
      data.forEach((item, index) => {
        const {image_location, page_number, text} = item
        console.log(`Item ${index + 1}:`)
        console.log('Page Number:', page_number)
        console.log('Image Location:', image_location)
        console.log('Text:', text)
      })
    }
  }, [data])

  return (
    // data.forEach(item => {
    //   const { image_location, page_number, text } = item;
    //   console.log('Page Number:', page_number);
    //   console.log('Image Location:', image_location);
    //   console.log('Text:', text);
    // });
    <div style={{width: '100%', maxWidth: '1500px'}}>
      <div>hello</div>
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis numquam
                reprehenderit cumque nostrum dicta! Cumque incidunt quo, ad esse, iusto perspiciatis
                voluptatibus temporibus, magnam dolorum consequuntur reiciendis a error facere. Sed
                ipsum molestiae commodi rem, nostrum consequatur aspernatur est at necessitatibus
                impedit eos illo neque doloremque, numquam voluptatum voluptas quod in officia
                culpa. Aspernatur aliquam, perferendis non sequi ex dolorum debitis esse recusandae
                cumque cum ratione delectus reiciendis libero tempore eum excepturi sit praesentium.
                Dolore rerum, nobis sint voluptates aliquid tenetur iusto sed voluptatibus obcaecati
                eum eligendi reiciendis eius, consequuntur omnis, sunt aliquam dolorem optio
                disticusandae cumque cum ratione delectus reiciendis libero tempore eum excepturi
                sit praesentium. Dolore rerum, nobis sint voluptates aliquid tenetur iusto sed
                voluptatibus obcaecati eum eligendi reiciendis eius, consequuntur omnis, sunt
                aliquam dolorem optio distinctio hic reprehenderit libero adipisci labore? Cum nemo
                ullam deleniti dolorum similique facilis iure qui neque
              </p>
            </div>
          </div>
          <div>hello</div>
          {/* <div className='row row-cols-1 row-cols-xl-1 row-cols-lg-1 row-cols-md-1 g-4 pt-0 pb-0'> */}
          <div className='d-flex justify-content-center'>
            <div>herrlq</div>
            <div className='allImageContainer'>
              {/* <div className='allImage'> */}
              {/* if (data)
              {data.forEach((item, index) => {
                const {image_location, page_number, text} = item
                console.log(`Item ${index + 1}:`)
                console.log('Page Number:', page_number)
                console.log('Image Location:', image_location)
                console.log('Text:', text)
              })} */}
              {allImg.map((img, index) => (
                <div key={index} className='imageContainer'>
                  <img
                    key={index}
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    alt=''
                    width={80}
                    height={80}
                    style={img === selectedImage ? {border: '2px solid red', height: '70px'} : {}}
                  />
                  <div className='imageNumber'>{index + 1}</div>
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      <div>hello 2</div>
    </div>
  )
}

export {Process}
