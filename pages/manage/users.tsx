import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { parse } from 'cookie'
import { serverEnum } from '@/constants'
import graphqlQuery from '@/actions/graphql'
import type { NextPageWithLayout } from '@/pages/_app'
import Layout from '@/components/loginLayout'

import { checkAuthStatus } from '@/actions/auth'

async function getData(cognitoId: string, client: string) {
  const query = `
    {
      clientUsers(clientId: ${client || 0}, cognitoId: "${cognitoId}") {
        count
        items {
          id
          role
          user {
            profile {
              id
              firstName
              lastName
              phoneNumber
              email
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
  const username = await checkAuthStatus(context)

  const cookies = parse(context.req.headers.cookie || '');
  const client = cookies.client

  try {
    const data = await getData(username, client)
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
            <li>MANAGE</li>
            <li>ユーザー管理</li>
          </ul>
        </div>
      </section>

      <section className="section main-section">
        <div className="card has-table">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
              ユーザー一覧
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
                  <th>氏名</th>
                  <th>電話番号</th>
                  <th>メールアドレス</th>
                  <th>役割</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.data.clientUsers.items.map((clientUser: any) => {
                  const user = clientUser.user
                  const profile = user.profile

                  return(
                    <tr key={`user_${user.id}`}>
                      <td className="image-cell">
                        <div className="image">
                          <Image
                            src={`https://avatars.dicebear.com/v2/initials/${profile.lastName}-${profile.firstName}.svg`}
                            alt={`user icon ${profile.lastName} ${profile.firstName}`}
                            className="rounded-full"
                            width={24}
                            height={24}
                          />
                        </div>
                      </td>
                      <td data-label="Name">{profile.lastName} {profile.firstName}</td>
                      <td data-label="phoneNumber">{profile.phoneNumber}</td>
                      <td data-label="email">{profile.email}</td>
                      <td data-label="role">{serverEnum.users.role[clientUser.role]}</td>
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
                })}
              </tbody>
            </table>
            <div className="table-pagination">
              <div className="flex items-center justify-between">
                <div className="buttons">
                  <button type="button" className="button active">1</button>
                  <button type="button" className="button">2</button>
                  <button type="button" className="button">3</button>
                </div>
                <small>Page 1 of 3</small>
              </div>
            </div>
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
