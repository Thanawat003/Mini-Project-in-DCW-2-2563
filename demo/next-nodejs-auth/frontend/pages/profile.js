import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Profile1 = ({ token }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <Layout>
            <Head>
                <title>Admin profile</title>
            </Head><Navbar />
            <div className={styles.container}>
                
                <div className={styles.title2}>
                    User profile </div><br />
                    <img src="https://sv1.picz.in.th/images/2021/04/23/AjK5ge.jpg" 
                    height ="400px"
                    width ="400px"
                    />
            <div className={styles.title2}>Thanawat Rungrueang <br /></div>
            <div className={styles.title1}>
                5735512022</div>
            <br />
            <div className={styles.title3}>Admin</div>
            <br />
            <br /><br />
            </div>
        </Layout >
    )
}

export default (Profile1)

/*export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}*/
