import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { VscCalendar } from "react-icons/vsc";
import './events.css'

export default function Events({event, id}) {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, orderBy("timestamp", "desc"));
      const querySnap = await getDocs(q);
      let events = [];
      querySnap.forEach((doc) => {
        return events.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setEvents(events);
      setLoading(false);
    }
    fetchEvents();
  }, []);
  return (
    events && ( 
    <div className="justify-content-center">
      <div className="container">
      <h1 id="cat-header" className='text-center'>Events</h1>
        {events.map(({ data, id }) => (
          <>
            <div id="card" className="card mb-3">
              <div className="row" key={id} onClick={() => navigate(`/charity/${data.type}/${id}`)}>
                <div className="col-md-6"> 
                  <div style={{
                      background: `url(${data.imgUrls[0]}) `,
                      backgroundSize: "cover",
                      }}
                      className="event-image rounded-start img-fluid">
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body outer">
                    <div class="col-md-12 text-center inner">
                      <h5 className="card-title text-center">{data.name}</h5>
                      <p className="card-text text-center"><VscCalendar className="icon"/>{data.date}</p>
                      <p className="card-text text-center"><GrLocation className="icon" />{data.location}</p>
                      <p className="card-text text-center">{data.intro}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5">
              <hr className="hr-events" />
            </div>
          </>
        ))}
      </div>
    </div>           
    )
  )
}
