import * as React from 'react'
import graphqlQuery        from '@/actions/graphql'

import type { NextPageWithLayout } from '@/pages/_app';
import Layout, { useLoginMenuContext } from '@/components/loginLayout';

import Link from 'next/link'

async function getData(cognitoId: string) {
  const query = `
    {
      connectionTest,
      currentUser(cognitoId: "${cognitoId}") {
        profile{
          firstName
          lastName
        }
        clients{
          id
          name
        }
      }
    }
  `

  try {
    const res = await graphqlQuery(query)
    return res
  } catch (error: any) {
    return error.message
  }
}

import { withSSRContext } from 'aws-amplify'

export async function getServerSideProps(context: any) {
  const { Auth } = withSSRContext(context)

  try {
    await Auth.currentAuthenticatedUser()
  } catch (error: any) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin'
      }
    }
  }

  try {
    const user = await Auth.currentAuthenticatedUser()
    const data = await getData(user.username)
    return {
      props: {
        data: data || null,
        message: {}
      }
    }
  } catch (error: any) {
    return {
      props: { error: error.message }
    }
  }
}

const Page: NextPageWithLayout = (props: any) => {
  const [menuData, setMenuData] = useLoginMenuContext();

  React.useLayoutEffect(() => {
    if(!props.data.currentUser) location.href = '/signin'
  })

  React.useEffect(() => {
    (async() => {
      setMenuData({ currentUser: props.data.currentUser })
    })();
  },[])

  return (
    <>
      <Link href='/'>index</Link><br/>
      test page

    </>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Page;
