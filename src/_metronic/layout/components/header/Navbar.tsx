import clsx from 'clsx'
// import {KTIcon} from '../../../helpers'
import {HeaderNotificationsMenu, ThemeModeSwitcher} from '../../../partials'
// import {useLayout} from '../../core'
import {useAuth} from '../../../../app/modules/auth'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt,faBell} from '@fortawesome/free-solid-svg-icons'

const itemClass = 'ms-1 ms-md-4'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px'
const userAvatarClass = 'symbol-35px'
// const btnIconClass = 'fs-2'

const Navbar = () => {
  const {logout} = useAuth()
  // const {config} = useLayout()
  return (
    <div className='app-navbar flex-shrink-0'>
      {/* <div className={clsx('app-navbar-item align-items-stretch', itemClass)}>
        <Search />
      </div> */}

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'hover'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          className={btnClass}
        >
           <FontAwesomeIcon icon={faBell} />
        </div>
        <HeaderNotificationsMenu />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <a onClick={logout} className='menu-link px-5'>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </a>
        </div>
      </div>

      {/* {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTIcon iconName='text-align-left' className={btnIconClass} />
          </div>
        </div>
      )} */}
    </div>
  )
}

export {Navbar}
