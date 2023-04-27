import * as React from 'react'
import Image from 'next/image'

interface Props {
  name: string
  icon?: string
  avatar?: {src: string, alt: string}
  itemsArray: {name: string, icon: string, link: string}[][]
}

export default function Page(props: Props) {
  const [status, setStatus] = React.useState('disabled')

  return (
    <div
      className={`navbar-item dropdown has-divider${status == 'active' ? ' active' : ''}${props.avatar ? ' has-user-avatar': ''}`}
      onClick={() => { setStatus(status == 'active' ? 'disabled' : 'active') }}
    >
      <a className="navbar-link">
        {
          props.avatar ?
            <>
              <div className="user-avatar">
                <Image src={props.avatar.src} alt={props.avatar.alt} className="rounded-full" width={24} height={24}/>
              </div>
              <div className="is-user-name"><span>John Doe</span></div>
            </> : <></>
        }

        {
          props.icon ?
            <>
              <span className="icon"><i className={`mdi ${props.icon}`}></i></span>
              <span>{props.name}</span>
              <span className="icon">
                <i className="mdi mdi-chevron-down"></i>
              </span>
            </> : <></>
        }
      </a>
      <div className="navbar-dropdown">
        {
          props.itemsArray.map((items: {name: string, icon: string, link: string}[], idx: number) => {
            return (
              <React.Fragment key={`${props.name}_${idx}`}>
                {idx == 0 ? <></> : <hr className="navbar-divider"/>}
                {
                  items.map((item: {name: string, icon: string, link: string}, idx: number) => {
                    return(
                      <a key={`${item.name}_${idx}`} href={item.link} className="navbar-item">
                        <span className="icon"><i className={`mdi ${item.icon}`}></i></span>
                        <span>{item.name}</span>
                      </a>
                    )
                  })
                }
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  )
}
