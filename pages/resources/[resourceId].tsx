import * as React from 'react'
import { useRouter } from "next/router"
import Image from 'next/image'
import { parse } from 'cookie';
import graphqlQuery from '@/actions/graphql'
import type { NextPageWithLayout } from '@/pages/_app';
import Layout, { useLoginMenuContext } from '@/components/loginLayout';

import { checkAuthStatus } from '@/actions/auth'

async function getData(cognitoId: string, client: string, resourceId: string) {
  const query = `
    {
      currentUser(cognitoId: "${cognitoId}") {
        profile {
          firstName
          lastName
        }
        clients {
          id
          name
        }
      }
      resources(clientId: ${client || 0}, cognitoId: "${cognitoId}", resourceId: ${resourceId}) {
        items {
          id
          name
          fields {
            id
            name
            orderIndex
            inputType
          }
          items {
            id
            status
            values {
              id
              version
              value
              field{
                id
                name
                orderIndex
                inputType
              }
            }
            steps {
              orderIndex
              values {
                id
                version
                value
                field{
                  id
                  name
                  orderIndex
                  inputType
                }
              }
            }
          }
        }
      }
    }
  `

  const res = await graphqlQuery(query)
  return res
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const resourceId = query.resourceId;

  const username = await checkAuthStatus(context)

  const cookies = parse(context.req.headers.cookie || '');
  const client = cookies.client

  try {
    const data = await getData(username, client, resourceId)
    return { props: { data: data || null } }
  } catch (error: any) {
    return { props: { error: error.message } }
  }
}

const Page: NextPageWithLayout = (props: any) => {
  const router = useRouter();
  const resource = props.data.resources.items[0]
  const FIELD_VIEW_REMIT = 4

  const sortedFields = props.data.resources.items[0].fields.sort((a: any, b: any) => a.order_index - b.order_index)
  const fieldKeys = sortedFields.map((item: any) => item.name);

  const getValueFromFieldKey = (objArray: any[], key: string) => {
    const obj = objArray.find((obj: any) => { return obj.field.name == key })
    return obj ? obj.value : null
  }

  return (
    <>
      <section className="is-title-bar">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <ul>
            <li>Resources</li>
            <li>{resource.name}一覧</li>
          </ul>
        </div>
      </section>

      <section className="section main-section">
        <div className="card has-table">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon"><i className="mdi mdi-database-outline"></i></span>
              {resource.name}一覧
            </p>
            <a className="card-header-icon" onClick={() => { router.push(window.location.pathname + window.location.search) }} style={{cursor: 'pointer'}}>
              <span className="icon"><i className="mdi mdi-reload"></i></span>
            </a>
          </header>

          <div className="card-content">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  {
                    fieldKeys.map((key: any, idx: number) => {
                      if (idx >= FIELD_VIEW_REMIT) return<></>
                      return <th key={`field_${idx}`}>{key}</th>
                    })
                  }
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  resource.items.map((item: any, idx: number) => {
                    return (
                      <tr key={`item_${idx}`}>
                        <td className="image-cell">
                          <div className="image">
                            <Image
                              src={`https://avatars.dicebear.com/v2/initials/${item.values[0].value}.svg`}
                              alt={`resource icon ${idx + 1}`}
                              className="rounded-full"
                              width={24}
                              height={24}
                            />
                          </div>
                        </td>
                        <td>{item.id}</td>
                        {
                          fieldKeys.map((key: any, idx: number) => {
                            if (idx >= FIELD_VIEW_REMIT) return<></>
                            return <td key={`field_${idx}`}>{getValueFromFieldKey(item.values, key)}</td>
                          })
                        }
                        <td></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
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
