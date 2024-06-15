import {Link, withRouter, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CiLogout} from 'react-icons/ci'
import './index.css'

const Header = () => {
  const history = useHistory()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div>
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dvjls69bh/image/upload/v1717826817/Frame_8004_afekic.png"
              alt="website logo"
            />
          </Link>
        </div>
        <ul className="nav-menu">
          <li>
            <button type="button" className="logic" onClick={onClickLogout}>
              <CiLogout className="sizer" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
