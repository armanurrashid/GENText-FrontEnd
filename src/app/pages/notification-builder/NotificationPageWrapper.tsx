import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {Notification} from './Notification'

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Notification</PageTitle>
      <Notification />
    </>
  )
}

export default BuilderPageWrapper
