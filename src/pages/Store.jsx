import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { AiOutlineClockCircle } from "react-icons/ai"
import { BsTelephone } from "react-icons/bs"
import { db } from "../firebase";
import './stores.css'
import Popover from "../components/Popover";


export default function Store() {
  const params = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStore() {
      const docRef = doc(db, "stores", params.storeId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStore(docSnap.data());
        setLoading(false);
      }
    }
    fetchStore();
  }, [params.storeId]);
  if (loading) {
    return <h3>Loading...</h3>;
  }


  return (
    <div className="justify-content-center">
      <div className="container">
        {store.imgUrls.map((id) => (
          <div className="card mt-5 mb-5">
            <div className="row">
              <div className="col-md-6">
              <div className="card-body outer">
                  <div className="col-md-12 text-center inner">
                  <div className="d-flex justify-content-end">
                      {store.curbside === true &&
                        <Popover />
                      }
                    </div>
                    <h4 id={store.brand} className="card-title text-center display-8">{store.name}</h4>
                    <p id={store.info} className="card-text text-center">{store.categories}</p>
                    <p id={store.info} className="card-text text-center"><BsTelephone className="icon" />{store.phone}</p>
                    <p id={store.info} className="card-text text-center"><AiOutlineClockCircle className="icon"/>{store.hours}</p>
                    <p id={store.info} className="card-text text-center"><GrLocation className="icon" />{store.location}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 outer">
              <div className="inner">
                <img
                    loading="lazy"
                    src={store.imgUrls[0]}
                    key={id}
                    id={store.id}
                    className="card-img"
                  >
                  </img>
              </div>
          </div>
        </div>
      </div>
      ))}
      {store.imgUrls.map((id) => (
      <div className="card mt-5 mb-5">
        <div className="row">
          <div className="col-6 col-md-6 text-start">
            <div className="outer">
              <div className="inner">
                <h2 id={store.tailor} className="card-title">About <b>{store.name}</b></h2>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-6 py-3 px-5">
            <div className="outer">
              <div className="inner">
                <p className="card-text">{store.about}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
     ))}
  </div>
</div>
);
}