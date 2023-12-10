/* eslint-disable jsx-a11y/anchor-is-valid */
// import clsx from 'clsx'
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  KTIcon,
  toAbsoluteUrl,
} from '../../../helpers';

interface Data {
  UploadConfirmation: string;
  ProcessingText: string;
  finalText: string;
}

const notificationData: Data[] = [
  {
    UploadConfirmation: 'Document.pdf is uploaded',
    ProcessingText: 'Document.pdf is Processing',
    finalText: "Document.pdf is Processed",
  },
];

const HeaderNotificationsMenu: FC = () => {
  useEffect(() => {
    const tab = document.getElementById('kt_topbar_notifications_1');
    if (tab) {
      tab.classList.add('show', 'active');
    }
  }, []);

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
      data-kt-menu='true'
    >
      <div
        className='d-flex flex-column bgi-no-repeat rounded-top'
        style={{backgroundImage: `url('${toAbsoluteUrl('/media/misc/menu-header-bg.jpg')}')`}}
      >
        <ul className='nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9 d-flex justify-content-center'>
          <li className='nav-item'>
            <h3 className='text-white mb-3 mt-3'>Notifications</h3>
          </li>
        </ul>
      </div>

      <div className='tab-content'>
        <div className='tab-pane fade show active' id='kt_topbar_notifications_1'>
          <div className='scroll-y mh-325px my-3 px-8'>
            {notificationData.map((file, index) => (
              <div key={index} className='flex-stack py-4'>
                <div className='mb-4 me-2'>
                  <div className='fs-6 text-gray-800 text-hover-primary fw-bolder'>{file.finalText}</div>
                </div>
                <div className='mb-4 me-2'>
                  <div className='fs-6 text-gray-800 text-hover-primary fw-bolder'>{file.ProcessingText}</div>
                </div>
                <div className='mb-4 me-2'>
                  <div className='fs-6 text-gray-800 text-hover-primary fw-bolder'>{file.UploadConfirmation}</div>
                </div>
                <div className='mb-4 me-2'>
                  <div className='fs-6 text-gray-800 text-hover-primary fw-bolder'>{file.finalText}</div>
                </div>
                <div className='mb-4 me-2'>
                  <div className='fs-6 text-gray-800 text-hover-primary fw-bolder'>{file.ProcessingText}</div>
                </div>
                <div className='mb-4 me-2'>
                  <div className='fs-6 text-gray-800 text-hover-primary fw-bolder'>{file.UploadConfirmation}</div>
                </div>
              </div>
            ))}
          </div>

          <div className='py-3 text-center border-top'>
            <Link
              to='/crafted/pages/profile'
              className='btn btn-color-gray-600 btn-active-color-primary'
            >
              View All <KTIcon iconName='arrow-right' className='fs-5' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeaderNotificationsMenu };
