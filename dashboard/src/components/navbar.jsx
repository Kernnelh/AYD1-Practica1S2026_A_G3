import logo from '../images/notes1.png'
import { Link } from 'react-router-dom';
const Navbar = ({show}) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <img src={logo} alt='logo' className='logo' />
            <ul>
                <li><Link to="/profile">Perfil</Link></li>
                <li><Link to="/notas">Notas</Link></li>  
                <li><Link to="/modify">Modificar Nota</Link></li>
                <li><Link to="/archived">Archivar Nota</Link></li>
                <li><Link to="/shared">Compartir Nota</Link></li>
                <li><Link to="/">Cerrar Sesion</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;