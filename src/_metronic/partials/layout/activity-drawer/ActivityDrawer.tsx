import React, {FC, useState} from 'react'
import './ActivityDrawer.css'
import {KTIcon} from '../../../helpers'
import logo from '../../../assets/images/img-1.jpg'
import image1 from '../../../assets/images/img-1.jpg'
import image2 from '../../../assets/images/img-2.jpg'
import image3 from '../../../assets/images/img-3.jpg'
import image4 from '../../../assets/images/img-4.jpg'
import image5 from '../../../assets/images/img-5.jpg'
import image6 from '../../../assets/images/img-6.jpg'
import image7 from '../../../assets/images/img-7.jpg'
import image8 from '../../../assets/images/img-8.jpg'
import image9 from '../../../assets/images/img-9.jpg'

const ActivityDrawer: FC = () => {
  const [selectedImage, setSelectedImage] = useState(image1)
  const [allImg, setAllImg] = useState([
    image1,
    image4,
    image5,
    image6, image1,
    image4,
    image5,
    image6, image1,
    image4,
    image5,
    image6, image1,
    image4,
    image5,
    image6,
  ])
  return (
    <div
      id='kt_activities'
      className='bg-body'
      data-kt-drawer='true'
      data-kt-drawer-name='activities'
      data-kt-drawer-activate='true'
      data-kt-drawer-overlay='true'
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_activities_toggle'
      data-kt-drawer-close='#kt_activities_close'
    >
      <div className='card shadow-none rounded-0' style={{width: '100%', maxWidth: '1115px'}}>
        <div className='card-header' id='kt_activities_header'>
          <h3 className='card-title fw-bolder text-dark my-0'>Activity Logs</h3>
          <div className='card-toolbar'>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-active-light-primary me-n5'
              id='kt_activities_close'
            >
              <KTIcon iconName='cross' className='fs-1' />
            </button>
          </div>
        </div>
        <div className='card-body position-relative pt-4' id='kt_activities_body'>
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
                <img
                  src={selectedImage}
                  alt='Upper Left'
                  style={{width: '400px', height: '400px'}}
                />
              </div>
              <div className='col' style={{overflow: 'auto', maxHeight: '400px'}}>
                <p style={{color: 'black'}}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis numquam
                  reprehenderit cumque nostrum dicta! Cumque incidunt quo, ad esse, iusto
                  perspiciatis voluptatibus temporibus, magnam dolorum consequuntur reiciendis a
                  error facere. Sed ipsum molestiae commodi rem, nostrum consequatur aspernatur est
                  at necessitatibus impedit eos illo neque doloremque, numquam voluptatum voluptas
                  quod in officia culpa. Aspernatur aliquam, perferendis non sequi ex dolorum
                  debitis esse recusandae cumque cum ratione delectus reiciendis libero tempore eum
                  excepturi sit praesentium. Dolore rerum, nobis sint voluptates aliquid tenetur
                  iusto sed voluptatibus obcaecati eum eligendi reiciendis eius, consequuntur omnis,
                  sunt aliquam dolorem optio distinctio hic reprehenderit libero adipisci labore?
                  Cum nemo ullam deleniti dolorum similique facilis iure qui neque, dolor earum,
                  pariatur eveniet nam. Nihil neque inventore quisquam voluptas quidem
                  exercitationem eum. Ut quod quae ea expedita dolor nulla commodi, alias totam
                  ipsum, libero quis! Tempore nemo natus, nihil fugiat, quisquam itaque nobis beatae
                  tempora saepe illum ipsa recusandae? Sint voluptates necessitatibus itaque earum.
                  Praesentium, laborum qui assumenda obcaecati recusandae cumque velit quaerat aut
                  perferendis, repudiandae facilis delectus vero magnam reprehenderit deserunt hic
                  quod aperiam maxime? Veniam in corrupti commodi laudantium modi adipisci velit!
                  Ipsam, natus dolorum iste cupiditate, illum pariatur facere tenetur, commodi
                  distinctio tempore sint eum?uptatibus temporibus, magnam dolorum consequuntur reiciendis a
                  error facere. Sed ipsum molestiae commodi rem, nostrum consequatur aspernatur est
                  at necessitatibus impedit eos illo neque doloremque, numquam voluptatum voluptas
                  quod in officia culpa. Aspernatur aliquam, perferendis non sequi ex dolorum
                  debitis esse recusandae cumque cum ratione delectus reiciendis libero tempore eum
                  excepturi sit praesentium. Dolore rerum, nobis sint voluptates aliquid tenetur
                  iusto sed voluptatibus obcaecati eum eligendi reiciendis eius, consequuntur omnis,
                  sunt aliquam dolorem optio distinctio hic reprehenderit libero adipisci labore?
                  Cum nemo ullam deleniti dolorum similique facilis iure qui neque, d
                </p>
              </div>
            </div>
            {/* <div className='row row-cols-1 row-cols-xl-1 row-cols-lg-1 row-cols-md-1 g-4 pt-0 pb-0'> */}
              <div className='d-flex justify-content-center'>
                <div className='allImageContainer'>
                  {/* <div className='allImage'> */}
                    {allImg.map((img, index) => (
                      <div key={index} className='imageContainer'>
                        <img
                          key={index}
                          src={img}
                          onClick={() => setSelectedImage(img)}
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
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export {ActivityDrawer}
