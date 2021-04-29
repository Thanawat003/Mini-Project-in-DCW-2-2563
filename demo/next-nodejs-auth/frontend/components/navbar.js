import Link from 'next/link'
import styles from "../styles/Index.module.css";

const Navbar = () => (
    
    <div className={styles.title1}>
        <Link href="/"><a> <b>Home </b></a></Link> |
        <Link href="/profile"><a> <b>Profile</b> </a></Link> | 
        <Link href="/roomedit"><a> <b>Room Data Edit</b> </a></Link> |  
        <div className={styles.inout}>
        <Link href="/login"><a> <b>Login</b> </a></Link> |
        <Link href="/logout"><a> <b>Logout</b> </a></Link></div> 
    </div>
    
    
  
		

)

export default Navbar