import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {Process} from './Process'

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>View Generated Text</PageTitle>
      <Process />
    </>
  )
}

export default BuilderPageWrapper
