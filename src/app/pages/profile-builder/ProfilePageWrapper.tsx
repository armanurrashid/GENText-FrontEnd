import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {Profile} from './Profile'

const ProfilePageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Profile</PageTitle>
      <Profile />
    </>
  )
}

export default ProfilePageWrapper
