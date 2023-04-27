import * as React from 'react'

interface Props {
  dropdownName: string
  dropdownIcon: any
  dropdownItems: {name: string, icon?: any, link: string}[][]
}

export default function Page(props: Props) {
  const [status, setStatus] = React.useState('disabled')

  return (
    <div
      className={`navbar-item dropdown has-divider${status == 'active' ? ' active' : ''}`}
      onClick={() => { setStatus(status == 'active' ? 'disabled' : 'active') }}
    >
      <a className="navbar-link">
        <span className="icon"><i className="mdi mdi-menu"></i></span>
        <span>{props.dropdownName}</span>
        <span className="icon">
          <i className="mdi mdi-chevron-down"></i>
        </span>
      </a>
      <div className="navbar-dropdown">
        {
          props.dropdownItems.map((items: {name: string, icon?: any, link: string}[], idx: number) => {
            return (
              <React.Fragment key={`${props.dropdownName}_${idx}`}>
                {idx == 0 ? <></> : <hr className="navbar-divider"/>}
                {
                  items.map((item: {name: string, icon?: any, link: string}, idx: number) => {
                    return(
                      <a key={`${item.name}_${idx}`} href={item.link} className="navbar-item">
                        <span className="icon"><i className="mdi mdi-account"></i></span>
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
