import { NavLink } from "react-router-dom"
import '../styles/defaultButton.style.css';

const NavBar = props => {

    const routes = ['Home','Articles','Live']

    const containerStyle = {
        display: 'flex',
        position: 'fixed',
        zIndex: '99'
    }

    return (
        <div style={containerStyle}>
            {routes.map( route => {
                const buttonCSSClass = (route == 'Live') ? 'red button' : 'button';
                return (
                    <NavLink
                        key={route}
                        to={`/${route}`}
                        end
                        className={({ isActive }) =>
                          isActive ? `${buttonCSSClass} active` : buttonCSSClass
                        }
                    >{route}</NavLink>)
            })}
        </div>
    )
}

export default NavBar
