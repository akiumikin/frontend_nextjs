import * as React from 'react'
import { useRouter } from "next/router";
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
          items {
            id
            status
            values {
              id
              version
              value
              field
            }
            steps {
              orderIndex
              values {
                id
                version
                value
                field
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

  return (
    <>
      <section className="is-title-bar">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <ul>
            <li>Resources</li>
            <li>{props.data.resources.items[0].name}一覧</li>
          </ul>
        </div>
      </section>

      <section className="section main-section">
        <div className="card has-table">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon"><i className="mdi mdi-database-outline"></i></span>
              {props.data.resources.items[0].name}一覧
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
                  <th>フロー名</th>
                  <th>利用状況<br/>[リード/有効/完了/保留/終了]</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {props.data.resources.items.map((resource: any) => {
                  const flow = resource.flow

                  return(
                    <tr key={`resource_${resource.id}`}>
                      <td className="image-cell">
                        <div className="image">
                          <Image
                            src={`https://avatars.dicebear.com/v2/initials/${resource.name}.svg`}
                            alt={`resource icon ${resource.name}`}
                            className="rounded-full"
                            width={24}
                            height={24}
                          />
                        </div>
                      </td>
                      <td data-label="Name">{resource.name}</td>
                      <td data-label="Flow">{flow.name}</td>
                      <td data-label="Counts">{'0 / 0 / 0 / 0 / 0'}</td>
                      <td className="actions-cell">
                        <div className="buttons right nowrap">
                          <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button">
                            <span className="icon"><i className="mdi mdi-eye"></i></span>
                          </button>
                          <button className="button small red --jb-modal" data-target="sample-modal" type="button">
                            <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })} */}
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
