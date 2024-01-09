import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <nav className='navbar'>
                <div className='container'>
                    <Link to="/" className='navbar-brand'>
                        <h1>The Orion Conquest</h1>
                    </Link>
            
                </div>
            </nav>
        </header>
    )
}

export default Navbar
