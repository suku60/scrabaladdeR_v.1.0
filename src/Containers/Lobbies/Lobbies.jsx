import React, { useEffect, useState }from 'react';
import axios from 'axios';

import { mainURL } from '../../environments';

import Notification from '../../Components/Notification/Notification';
import LobbyCard from '../../Components/LobbyCard/LobbyCard';

import { connect } from "react-redux";

import './Lobbies.css';
import { useNavigate } from 'react-router-dom';

const Lobbies = (props) => {

  let navigate = useNavigate();

  const [lobbies, setLobbies] = useState([]);

  const [notificationDisplay, setNotificationDisplay] = useState("none");
  const [msg, setMsg] = useState("");

  useEffect(() => {

    if(!lobbies.length){
    bringLobbies();
    }

    if(!props.passport?.token){
      navigate("/");
  }

  });

  useEffect(() => {
  },[]);
 

  // Services
  const bringLobbies = async (type) => {

    if(!type){
      type = "Available"
    }

    console.log(type)

    let lobbiesResponse;

    try {

        let config = {
          headers: { Authorization: `Bearer ${props?.passport?.token}` }
        };

        console.log(`${mainURL}/lobbies/find${type}`)

        let lobbiesResponse = await axios.get(`${mainURL}/lobbies/find${type}`, config);
        
        console.log(lobbiesResponse);

        if (lobbiesResponse.data.length !== 0) {
            setLobbies(lobbiesResponse.data)
        }

    } catch (error) {

      setMsg("Something went wrong, please try again later");
     
      // // console.log(error)


    }


  }


  // // console.log("lobbies", lobbies);

  return (
    <div className="box_basic_container box_bg Lobbies">
      <Notification notificationDisplay={notificationDisplay} customMsg={msg}/>
      <div className="board"  id='animItemFromTopToBottom'>
        
      { lobbies.map(lobbyObject => {
        return(
          <LobbyCard
          key={lobbyObject.id}
          lobbyName={lobbyObject.lobbyName}
          playersSize={lobbyObject.playersSize}
          turnSecondsTimer={lobbyObject.turnSecondsTimer}
          gameMaxMinutesTimer={lobbyObject.gameMaxMinutesTimer}
          />
        )
      })}
      </div>
    </div>
  )
}

// id
// lobbyName
// turnSecondsTimer
// gameMaxMinutesTimer
// playersSize

export default connect((state) => ({
  passport: state.passport,
  lobby: state.lobby
}))(Lobbies);