import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './stores.css'

export default function StoresMain({store, id}) {
  const [stores, setStores] = useState(null);
  const [setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStores() {
      const storesRef = collection(db, "stores");
      const q = query(storesRef, orderBy("timestamp", "desc"));
      const querySnap = await getDocs(q);
      let stores = [];
      querySnap.forEach((doc) => {
        return stores.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setStores(stores);
      setLoading(false);
    }
    fetchStores();
  }, []);
  
  return (
    stores && (
    <div className="justify-content-center">
      <div className="stores-main-background">
        <div className="container-fluid">
          <h1 id="cat-main-header" className='text-center text-white'>Stores</h1>
            <div className="row">
              {stores.map(({ data, id }) => (
                <div className="col-lg-6 py-3 px-3 mr-3 ml-3">
                  <div className="card py-5 px-5">
                    <div className="brand-wrapper" key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                        <h1 id={data.brand} className="card-title text-center stores-names">{data.name}</h1>
                    </div>
                  </div>
                </div>
                ))}
            </div>
          </div>
         </div>
        </div>
       )
     ) 
   }