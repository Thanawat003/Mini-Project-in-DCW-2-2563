import Link from 'next/link'

const Navbar = () => (
    <div>
        <Link href="/"><a> <b>Home </b></a></Link> |
        <Link href="/register"><a> <b>Register</b> </a></Link>  |
        <Link href="/login"><a> <b>Login</b> </a></Link> |
        <Link href="/profile"><a> <b>Profile</b> </a></Link> | 
        <Link href="/roomedit"><a> <b>Room Data Edit</b> </a></Link> |
        <Link href="/logout"><a> <b>Logout</b> </a></Link> 
        
    </div>
)

export default Navbar