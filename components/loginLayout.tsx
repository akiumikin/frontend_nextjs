import * as React from 'react'
import { parse, serialize } from 'cookie'

import { signOut } from '@/actions/auth'

import NavbarDropdown   from '@/components/dropdown/navbar'
// import SidemenuDropdown from '@/components/dropdown/sidemenu'
import Select           from '@/components/form/selectField'
import Link from 'next/link'

const LoginMenuContext = React.createContext([{}, null as any ])
export const useLoginMenuContext = () => React.useContext(LoginMenuContext);

interface Props {
  children: React.ReactNode
}

export default function Page(props: Props) {
  const [menuData, setMenuData] = React.useState({
    currentUser: {
      profile: null as any,
      clients: [] as any
    },
    resources: {count: 0, items: [{} as any]}
  })

  const currentUser = menuData.currentUser ? menuData.currentUser.profile : undefined
  const userClients = menuData.currentUser ? menuData.currentUser.clients : undefined
  const clientCookie = React.useRef(undefined as string | undefined)

  React.useEffect(() => {
    const cookies = parse(document.cookie)
    let client = cookies.client

    if(!client && userClients[0]) {
      const client = serialize('client', userClients[0].id, {});
      document.cookie = client
    }

    clientCookie.current = client
  },[userClients])

  const [mobileNavMenuOpenStatus, setMobileNavMenuOpenStatus] = React.useState(false)
  const [mobileSideMenuOpenStatus, setMobileSideMenuOpenStatus] = React.useState(false)

  const onClickMobileNav = () => {
    setMobileNavMenuOpenStatus(!mobileNavMenuOpenStatus)
  }

  const onClickMobileSideMenu = () => {
    setMobileSideMenuOpenStatus(!mobileSideMenuOpenStatus)
  }

  const changeCurrentClient = (value: string) => {
    const client = serialize('client', value, {});
    document.cookie = client
    location.reload()
  }

  if(!currentUser || !userClients) {
    return (
      <LoginMenuContext.Provider value={[menuData, setMenuData]}>
        {props.children}
      </LoginMenuContext.Provider>
    )
  }
console.log(menuData)
  return (
    <LoginMenuContext.Provider value={[menuData, setMenuData]}>
      <div className={`${mobileSideMenuOpenStatus ? 'aside-mobile-expanded' : ''}`}>
        <nav id="navbar-main" className="navbar is-fixed-top">
          <div className="navbar-brand">
            <a className="navbar-item mobile-aside-button" onClick={() => {onClickMobileSideMenu()}}>
              <span className="icon"><i className={`mdi ${mobileSideMenuOpenStatus ? 'mdi-backburger' : 'mdi-forwardburger'} mdi-24px`}></i></span>
            </a>
            <div className="navbar-item">
              <div className="control"><input placeholder="Search everywhere..." className="input"/></div>
            </div>
          </div>
          <div className="navbar-brand is-right">
            <a className="navbar-item --jb-navbar-menu-toggle" data-target="navbar-menu" onClick={() => {onClickMobileNav()}}>
              <span className="icon"><i className="mdi mdi-dots-vertical mdi-24px"></i></span>
            </a>
          </div>
          <div className={`navbar-menu${mobileNavMenuOpenStatus ? ' active' : ''}`} id="navbar-menu">
            <div className="navbar-end">
              {
                <Select
                  setState={changeCurrentClient}
                  options={userClients.map((c: any) => {return {label: c.name, value: c.id } })}
                  defaultValue={clientCookie.current}
                />
              }
              <NavbarDropdown
                name={`${currentUser.lastName} ${currentUser.firstName}`}
                avatar={{src: `https://avatars.dicebear.com/v2/initials/${currentUser.lastName}_${currentUser.firstName}.svg`, alt: 'avatar'}}
                itemsArray={
                  [
                    [
                      {name: 'My Profile', icon: 'mdi-account', link: '/'},
                      {name: 'Settings', icon: 'mdi-cog-outline', link: '/'},
                      {name: 'Messages', icon: 'mdi-email', link: '/'}
                    ],
                    [
                      {name: 'Log Out', icon: 'mdi-logout', link: '/'}
                    ]
                  ]
                }
              />
              <a href="https://justboil.me/tailwind-admin-templates/free-dashboard/" className="navbar-item has-divider desktop-icon-only">
                <span className="icon"><i className="mdi mdi-help-circle-outline"></i></span>
                <span>About</span>
              </a>
              <a href="https://github.com/justboil/admin-one-tailwind" className="navbar-item has-divider desktop-icon-only">
                <span className="icon"><i className="mdi mdi-github"></i></span>
                <span>GitHub</span>
              </a>
              <a title="Log out" className="navbar-item desktop-icon-only" onClick={() => {signOut()}} style={{cursor: 'pointer'}}>
                <span className="icon"><i className="mdi mdi-logout"></i></span>
                <span>Log out</span>
              </a>
            </div>
          </div>
        </nav>

        <aside className="aside is-placed-left is-expanded">
          <div className="menu is-menu-main">
            <p className="menu-label">General</p>
            <ul className="menu-list">
              <li>
                <Link href='/'>
                  <span className="icon"><i className="mdi mdi-view-dashboard"></i></span>
                  <span className="menu-item-label">ダッシュボード</span>
                </Link>
              </li>
            </ul>
            <p className="menu-label">Resources</p>
            <ul className="menu-list">
              {menuData.resources.items.map((resource: {id: number, name: string}, idx: number) => {
                return(
                  <li key={`resources_${idx}`}>
                    <Link href={`/resources/${resource.id}`}>
                      <span className="icon"><i className="mdi mdi-database-outline"></i></span>
                      <span className="menu-item-label">{resource.name}</span>
                    </Link>
                  </li>
                )
              })}

              {/* <SidemenuDropdown
                name='Submenus'
                icon='mdi-view-list'
                items={[
                  {name: 'Sub-item One', link: '/'},
                  {name: 'Sub-item Two', link: '/'},
                ]}
              /> */}
            </ul>
            <p className="menu-label">Manage</p>
            <ul className="menu-list">
              <li>
                <Link href='/manage/users'>
                  <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                  <span className="menu-item-label">ユーザー</span>
                </Link>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <Link href='/manage/resources'>
                  <span className="icon"><i className="mdi mdi-data-matrix"></i></span>
                  <span className="menu-item-label">リソース</span>
                </Link>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <Link href='/manage/flows'>
                  <span className="icon"><i className="mdi mdi-clipboard-flow-outline"></i></span>
                  <span className="menu-item-label">フロー</span>
                </Link>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <Link href='/manage/tags'>
                  <span className="icon"><i className="mdi mdi-tag-outline"></i></span>
                  <span className="menu-item-label">タグ</span>
                </Link>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <Link href='/manage/system/logs'>
                  <span className="icon"><i className="mdi mdi-file-cog-outline"></i></span>
                  <span className="menu-item-label">システムログ</span>
                </Link>
              </li>
            </ul>
            <p className="menu-label">Personal</p>
            <ul className="menu-list">
              <li>
                <Link href='/profile'>
                  <span className="icon"><i className="mdi mdi-account-outline"></i></span>
                  <span className="menu-item-label">プロフィール</span>
                </Link>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <a className="has-icon" onClick={() => {signOut()}} style={{cursor: 'pointer'}}>
                  <span className="icon"><i className="mdi mdi-logout"></i></span>
                  <span className="menu-item-label">ログアウト</span>
                </a>
              </li>
            </ul>
            <p className="menu-label">About</p>
            <ul className="menu-list">
              <li>
                <a href="https://github.com/akiumikin/frontend_nextjs" className="has-icon" target='_blank'>
                  <span className="icon"><i className="mdi mdi-github"></i></span>
                  <span className="menu-item-label">GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <div className='loginContent'>{props.children}</div>
    </LoginMenuContext.Provider>
  )
}
