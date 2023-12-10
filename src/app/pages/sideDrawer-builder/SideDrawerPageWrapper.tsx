import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {SideDrawer} from './SideDrawer'

const sideDrawerPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Side Drawer</PageTitle>
      <SideDrawer />
    </>
  )
}

export default sideDrawerPageWrapper
