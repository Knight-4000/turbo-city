import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { VscCalendar } from "react-icons/vsc";
import { db } from "../firebase";
import './events.css'

export default function Event() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      const docRef = doc(db, "events", params.eventId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvent(docSnap.data());
        setLoading(false);
      }
    }
    fetchEvent();
  }, [params.eventId]);
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="justify-content-center">
      <div className="container">
      {event.imgUrls.map((id) => (
        <div className="card mt-5 mb-5">
          <div className="row">
            <div className="col-md-6">
              <img
                loading="lazy"
                src={event.imgUrls[0]}
                key={id}
                id={event.id}
                className="card-img rounded-start img-fluid"
              >
              </img>
            </div>
            <div className="col-md-6">
              <div className="card-body outer">
                <div className="col-md-12 text-center inner">
                  <h4 id="card-title-show" className="card-title text-center display-8">{event.name}</h4>
                  <p id="card-text-show" className="card-text text-center">{event.subtitle}</p>
                  <p id="card-text-show" className="card-text text-center"><VscCalendar className="icon"/>{event.date}</p>
                  <p id="card-text-show" className="card-text text-center"><GrLocation className="icon" />{event.location}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
      ))}
      {event.imgUrls.map((id) => (
      <div className="col-md-12 text-center">
        <div className="card py-5">
          <h2 className="card-title">Additional Information</h2>
          <h5 className="card-text text-center">{event.description}</h5>
        </div>
      </div>
     ))}
  </div>
</div>
);
}
