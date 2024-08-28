import React from 'react'
import { Metadata } from 'next'
import { getOrganizationContextInfo } from '@services/organizations/orgs'
import Trail from './trail'
import { auth } from 'app/auth/auth'

type MetadataProps = {
  params: { orgslug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
const session = await auth() as any;  const access_token = session?.tokens?.access_token
  // Get Org context information
  const org = await getOrganizationContextInfo(params.orgslug, {
    revalidate: 1800,
    tags: ['organizations'],
  }, access_token)
  return {
    title: 'Trail — ' + org.name,
    description:
      'Check your progress using trail and easily navigate through your courses.',
  }
}

const TrailPage = async (params: any) => {
  let orgslug = params.params.orgslug

  return (
    <div>
      <Trail orgslug={orgslug} />
    </div>
  )
}

export default TrailPage
