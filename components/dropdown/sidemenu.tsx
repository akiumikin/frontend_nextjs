import * as React from 'react'

interface Props {
  name: string
  icon?: string
  avatar?: {src: string, alt: string}
  items: {name: string, link: string}[]
}

export default function Page(props: Props) {
  const [status, setStatus] = React.useState('disabled')

  return (
    <li className={`${status == 'active' ? ' active' : ''}`} onClick={() => { setStatus(status == 'active' ? 'disabled' : 'active') }}>
      <a className="dropdown">
        <span className="icon"><i className={`mdi ${props.icon}`}></i></span>
        <span className="menu-item-label">{props.name}</span>
        <span className="icon"><i className="mdi mdi-plus"></i></span>
      </a>
      <ul>
        {
          props.items.map((items: {name: string, link: string}, idx: number) => {
            return(
              <li key={`${props.name}_${idx}`}>
                <a href={items.link}>
                  <span>{items.name}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
    </li>
  )
}
