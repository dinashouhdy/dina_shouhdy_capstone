import React, { useState } from "react";
import axios from "axios";
import "./Homepage.scss";
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";

const CREATE_TRIP_URL = "http://localhost:8080/create-trip";
const JOIN_TRIP_URL = "http://localhost:8080/join-trip";

function Homepage() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [tripId, setTripId] = useState("");

  const handleCreateTrip = async () => {
    const response = await axios.post(CREATE_TRIP_URL, {
      username: username.toLowerCase(),
    });
    navigate(`${response.data.tripId}/${username.toLowerCase()}`)
};

  const handleJoinTrip = async () => {
    const response = await axios.post(JOIN_TRIP_URL, {
        username: username.toLowerCase(),
        tripId: tripId

      });
      navigate(`${tripId}/${username.toLowerCase()}`)
  };

  return (
    <section className='homepage'>
      <div className='homepage__form'>
      <input className='homepage__form__input' placeholder="Username" onChange={(e) => setUserName(e.target.value)}></input>
        <button
          className='homepage__form__button'
          type="submit"
          onClick={() => handleCreateTrip()}
        >
          Create a trip
        </button>
      </div>

      <h1 className="or">OR</h1>

      <div className='homepage__form'>
        <input className='homepage__form__input' placeholder="Enter Username" onChange={(e) => setUserName(e.target.value)}></input>
        <input className='homepage__form__input' placeholder="Insert Trip Id" onChange={(e) => setTripId(e.target.value)}></input>
        <button
          className='homepage__form__button'
          type="submit"
          onClick={() => handleJoinTrip()}>
          Join a trip
        </button>
      </div>
      <Footer />
    </section>
    
  );
}

export default Homepage;
