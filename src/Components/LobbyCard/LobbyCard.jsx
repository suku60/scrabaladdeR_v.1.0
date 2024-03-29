import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './LobbyCard.css';

import { connect } from "react-redux";
import { LOBBYLOG, ISUSERJOININGLOBBY } from "../../redux/types";

import {ReactComponent as PrivateSvg} from '../../assets/svg/private.svg'
import {ReactComponent as PublicSvg} from '../../assets/svg/public.svg'
import {ReactComponent as ActiveSvg} from '../../assets/svg/active.svg'
import {ReactComponent as PlayersSvg} from '../../assets/svg/players.svg'
import {ReactComponent as TimerSvg} from '../../assets/svg/clock.svg'
import {ReactComponent as JoinBtnSvg} from '../../assets/svg/join.svg'
import {ReactComponent as EyeSvg} from '../../assets/svg/eye.svg'

const LobbyCard = (props) => {

  let navigate = useNavigate();

  const [isPrivate, setIsPrivate] = useState(props.isPrivate);
  const [isFull, setIsFull] = useState(props.isFull);
  const [isActive, setIsActive] = useState(props.isActive);

  const selectLobby = (selectedLobbyId, action) => {

    
    if(action === "join"){
      props.dispatch({type: LOBBYLOG, payload: selectedLobbyId})
      props.dispatch({type: ISUSERJOININGLOBBY, payload: true})
      navigate(`/lobbies/${selectedLobbyId}`)
    }else{
      props.dispatch({type: LOBBYLOG, payload: selectedLobbyId})
      props.dispatch({type: ISUSERJOININGLOBBY, payload: false})
      navigate(`/lobbies/${selectedLobbyId}`)
    }
    // desiredView(`/lobbies/${lobby.id + Math.round(666*Math.random(666))}`)

  }

  return (
    <div className="box_lobby_card  italic_text" 
    id="animReverseFade">
      <div className="lobby_card_name centered_content">        
        <div className="lobby_name">
          {props.lobbyName}
        </div> 
        <div className="temporary_join_btn centered_content" onClick={()=>{selectLobby(props.id, "join")}}>
          JOIN
        </div> 
      </div>
      <div className="lobby_card_data centered_content">
        <div className="lobby_data data_size_timer  centered_content ">
          <PlayersSvg/>
          <p>
            {props.playersSize}
            
            </p>
        </div>
       
        <div className="lobby_data centered_content data_size_timer">
          <TimerSvg/>
          {props.turnSecondsTimer}s | {props.gameMaxMinutesTimer}min
        </div>
        <div className="lobby_data status centered_content">
          { isPrivate ? <PrivateSvg fill="red" /> : <PublicSvg fill="green"/> }
          { isFull ? <PlayersSvg fill="red"/> : <PlayersSvg fill="green"/> }
          { isActive ? <ActiveSvg fill="red"/> : <ActiveSvg fill="green"/> }
        </div>
        <div className="lobby_data centered_content data_watch"  onClick={()=>{selectLobby(props.id, "watch")}}>
          <EyeSvg/>
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({
  passport: state.passport,
  lobby: state.lobby
}))(LobbyCard);