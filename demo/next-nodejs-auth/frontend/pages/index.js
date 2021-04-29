import Head from 'next/head' 
import Layout from '../components/layout' 
import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { } from "react";
import styles from "../styles/Index.module.css";
import Navbar from "../components/navbar";
import { Container, Row, Col } from "react-bootstrap";
const URL = "http://localhost/api/rooms";
const URL_SEL = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const index = () => {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  
  const selStu = async (id) => {
    let result = await axios.post(`${URL_SEL}/${id}`)
    mutate(URL, data);
  }


  const showRooms = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          
          <div className={styles.listItem} key={index}>
            <img src="https://cdn.renthub.in.th/images/uploaded/202006/20200605/apartment_pictures/normal/5f60de636bf987b171f6ff728dd4358b.jpg?1591326461" width="180px" height="150px"></img>
            <div className={styles.name2}>{item.name} {item.surname}</div>
            <div className={styles.checkin}><b>CheckIn:</b><br/> {item.checkin} </div>
            <div className={styles.checkout}><b>DueDate:</b><br/> {item.duedate} </div>
            <div><b>Roomnumber:</b><br/></div> 
            <div className={styles.roomnum}>{item.number}</div>
          </div>
          
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <Layout>
       <Head>
        <title>Home Page</title>
    </Head>
    <Navbar />
    <div className={styles.container}>
      <div className={styles.title}>
      <marquee bgcolor="#34495E" direction="lefe" scrollamount="5" width="100%"><ins>Welcome to Rooms Data</ins></marquee></div>
      <div className={styles.list}>
        {showRooms()}
      </div><br/><br/><br/>
    </div>
    </Layout>
  );
};
export default index;
