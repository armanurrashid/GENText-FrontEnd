import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {History} from './History'

const HistoryPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>History</PageTitle>
      <History />
    </>
  )
}

export default HistoryPageWrapper
