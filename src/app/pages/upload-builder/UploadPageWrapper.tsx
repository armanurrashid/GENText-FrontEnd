import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {Upload} from './Upload'

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Upload</PageTitle>
      <Upload />
    </>
  )
}

export default BuilderPageWrapper
