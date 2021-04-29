import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/room.module.css";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/rooms";
const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState({});
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [checkin, setCheckin] = useState("");
  const [duedate, setDuedate] = useState("");
  const [number, setNumber] = useState("");
  const [room, setRoom] = useState({});
  useEffect(() => {
    getRooms();
    profileUser();
  }, []);
  const profileUser = async () => {
    try {
      
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getroom = async (id) => {
    const result = await axios.get(`${URL}/${id}`)
    console.log('room id: ', result.data)
    setRoom(result.data)
}
 
  const getRooms = async () => {
    let result = await axios.get(URL);
    setRooms(result.data.list);
  };

  const addRoom = async () => {
    let result = await axios.post(URL, {
      name,
      surname,
      checkin,
      duedate,
      number,
    });
    console.log(result);
    getRooms();
  };

  const deleteRoom = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getRooms();
  };

  const updateRoom = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      name,
      surname,
      checkin,
      duedate,
      number,
    });
    console.log(result);
    getRooms();
  };

  const showRooms = () => {
    if (rooms && rooms.length) {
      return rooms.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div className={styles.name2}><b>Name:</b> {item.name} <br /></div>
            <div className={styles.name2}><b>Surname:</b> {item.surname} <br /></div>
            <div className={styles.checkin}><b>CheckIn:</b> {item.checkin} <br /></div>
            <div className={styles.checkout}><b>DueDate:</b> {item.duedate} <br /></div>
            <div className={styles.roomnum}><b>Roomnumber:</b> {item.number}</div>
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getroom(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updateRoom(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deleteRoom(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (<div> <Navbar />
    <div className={styles.container}>
     
      <div className={styles.title2}><ins>Room Data Edit </ins></div>
      <div className={styles.listItem1}>
      <div className={styles.roomselect }><b><i><ins>(selected room)</ins></i></b></div>
      <div className={styles.name2}> 
        <b><ins>Name:</ins></b><div className={styles.name}>{room.name}</div> 
        <b><ins>Surname:</ins></b><div className={styles.name}>{room.surname}</div> 
        <b>  Checkin:</b><div className={styles.checkin}>{room.checkin}</div> 
        <b>  Duedate:</b><div className={styles.checkout}>{room.duedate}</div> 
         <b>Roomnumber:</b><div className={styles.roomnum2}>{room.number}</div></div></div>
      <div className={styles.form_add}>
        <h2>Add Rooms</h2>
        Name:
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        Surname:
        <input
          type="text"
          name="surname"
          onChange={(e) => setSurname(e.target.value)}
        ></input>
        CheckIn:
        <input
          type="text"
          name="checkin"
          onChange={(e) => setCheckin(e.target.value)}
        ></input>
        DueDate:
        <input
          type="text"
          name="duedate"
          onChange={(e) => setDuedate(e.target.value)}
        ></input>
        Roomnumber:
        <input
          type="text"
          name="number"
          onChange={(e) => setNumber(e.target.value)}
        ></input>
        <button
          className={styles.button_add}
          onClick={() => addRoom(name, surname, checkin, duedate, number)}
        >
          Add
        </button>
      </div>

      <div className={styles.list}>{showRooms()}</div>
      
    </div></div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
