import * as React from 'react'
// import { Auth } from 'aws-amplify';

import { signOut } from '@/actions/auth'

import NavbarDropdown   from '@/components/dropdown/navbar'
import SidemenuDropdown from '@/components/dropdown/sidemenu'
import Select           from '@/components/form/selectField'

const LoginMenuContext = React.createContext([{}, null as any ])
export const useLoginMenuContext = () => React.useContext(LoginMenuContext);

interface Props {
  children: React.ReactNode
}

export default function Page(props: Props) {
  const [menuData, setMenuData] = React.useState({
    currentUser: {
      profile: null as any,
      clients: []
    },
    resources: []
  })

  const currentUser = menuData.currentUser ? menuData.currentUser.profile : undefined
  const userClients = menuData.currentUser ? menuData.currentUser.clients : undefined

  const [mobileNavMenuOpenStatus, setMobileNavMenuOpenStatus] = React.useState(false)
  const [mobileSideMenuOpenStatus, setMobileSideMenuOpenStatus] = React.useState(false)

  const onClickMobileNav = () => {
    setMobileNavMenuOpenStatus(!mobileNavMenuOpenStatus)
  }

  const onClickMobileSideMenu = () => {
    setMobileSideMenuOpenStatus(!mobileSideMenuOpenStatus)
  }

  const changeCurrentClient = (value: String) => {
    console.log(value)
    // location.reload()
  }

  if(!currentUser || !userClients) return <LoginMenuContext.Provider value={[menuData, setMenuData]}>{props.children}</LoginMenuContext.Provider>

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
              <li className="active">
                <a href="index.html">
                  <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                  <span className="menu-item-label">Dashboard</span>
                </a>
              </li>
            </ul>
            <p className="menu-label">Examples</p>
            <ul className="menu-list">
              <li className="--set-active-tables-html">
                <a href="tables.html">
                  <span className="icon"><i className="mdi mdi-table"></i></span>
                  <span className="menu-item-label">Tables</span>
                </a>
              </li>
              <li className="--set-active-forms-html">
                <a href="forms.html">
                  <span className="icon"><i className="mdi mdi-square-edit-outline"></i></span>
                  <span className="menu-item-label">Forms</span>
                </a>
              </li>
              <li className="--set-active-profile-html">
                <a href="profile.html">
                  <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                  <span className="menu-item-label">Profile</span>
                </a>
              </li>
              <li>
                <a href="login.html">
                  <span className="icon"><i className="mdi mdi-lock"></i></span>
                  <span className="menu-item-label">Login</span>
                </a>
              </li>
              <SidemenuDropdown
                name='Submenus'
                icon='mdi-view-list'
                items={[
                  {name: 'Sub-item One', link: '/'},
                  {name: 'Sub-item Two', link: '/'},
                ]}
              />
            </ul>
            <p className="menu-label">About</p>
            <ul className="menu-list">
              <li>
                <a href="https://justboil.me/tailwind-admin-templates/free-dashboard/" className="has-icon">
                  <span className="icon"><i className="mdi mdi-help-circle"></i></span>
                  <span className="menu-item-label">About</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/justboil/admin-one-tailwind" className="has-icon">
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
