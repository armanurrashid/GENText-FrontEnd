/* eslint-disable react/jsx-no-target-blank */
// import React from 'react'
import {useIntl} from 'react-intl'
// import {KTIcon} from '../../../../helpers'
// import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartBar , faUpload, faHistory, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon={<FontAwesomeIcon icon={faChartBar } />}
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem to='/upload' icon={<FontAwesomeIcon icon={faUpload} />} title='Upload' fontIcon='bi-layers' />
      <SidebarMenuItem to='/history' icon={<FontAwesomeIcon icon={faHistory} />} title='History' fontIcon='bi-layers' />
      <SidebarMenuItem to='/notification' icon={<FontAwesomeIcon icon={faBell} />} title='Notification' fontIcon='bi-layers' />
      <SidebarMenuItem to='/profile' title='Profile' icon={<FontAwesomeIcon icon={faUser} />} fontIcon='bi-layers' />
      {/* </SidebarMenuItem> */}
    </>
  )
}

export {SidebarMenuMain}
