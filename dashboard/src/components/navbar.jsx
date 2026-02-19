import logo from '../images/notes1.png'
import { Link } from 'react-router-dom';
const Navbar = ({show}) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <img src={logo} alt='logo' className='logo' />
            <ul>
                <li><Link to="/profile">Perfil</Link></li>
                <li><Link to="/">Notas</Link></li>  
                <li><Link to="/modify">Modificar Nota</Link></li>
                <li><Link to="/delete">Eliminar Nota</Link></li>
                <li><Link to="/set">Fijar Nota</Link></li>
                <li><Link to="/archived">Archivar Nota</Link></li>
                <li><Link to="/shared">Compartir Nota</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;