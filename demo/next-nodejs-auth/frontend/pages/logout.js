import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }
 
    return (
        <Layout>
            <Head>
                <title>Logout Page</title>
            </Head> <Navbar />
            <div className={styles.container}>
                <div className={styles.title2}>
                <h1>Logout</h1></div>
                <div>
                <div className={styles.title1}><h2> {status} </h2></div>
                </div>
            </div>
        </Layout>
    )
}
