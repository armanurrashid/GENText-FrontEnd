import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {Process} from './Process'
// import {useLocation} from 'react-router-dom'
const ProcessPageWrapper: FC = () => {
  // const location = useLocation()
  // const pathSegments = location.pathname.split('/')
  // const sourceClass = pathSegments[pathSegments.length - 1]
  // console.log(sourceClass)
  return (
    <>
      <PageTitle breadcrumbs={[]}>View Generated Text</PageTitle>
      <Process />
    </>
  )
}

export default ProcessPageWrapper
