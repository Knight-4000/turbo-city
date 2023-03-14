import { useState } from "react"
import { toast } from "react-toastify";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";
export default function CreateStore() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "shopping",
        name: "",
        description: "",
        images: {},
    });

    const {
        type,
        name,
        description,
        images,
    } = formData;
    function onChange(e) {
        let boolean = null;
        if (e.target.value === "true") {
          boolean = true;
        }
        if (e.target.value === "false") {
          boolean = false;
        }
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            images: e.target.files,
          }));
        }
        // Text/Boolean/Number
        if (!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
          }));
        }
      }
      async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (images.length > 1) {
          setLoading(false);
          toast.error("Only one image per store");
          return;
        }
  
        async function storeImage(image) {
          return new Promise((resolve, reject) => {
            const storage = getStorage();
            const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
        
                }
              },
              (error) => {
                // Handle unsuccessful uploads
                reject(error);
              },
              () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL);
                });
              }
            );
          });
        }
    
        const imgUrls = await Promise.all(
          [...images].map((image) => storeImage(image))
        ).catch((error) => {
          setLoading(false);
          toast.error("Images not uploaded");
          return;
        });
    
        const formDataCopy = {
          ...formData,
          imgUrls,
          timestamp: serverTimestamp(),
        };
        delete formDataCopy.images;
        const docRef = await addDoc(collection(db, "stores"), formDataCopy);
        setLoading(false);
        toast.success("Listing created");
        navigate(`/category/${formDataCopy.type}/${docRef.id}`);
      }
    
      if (loading) {
        return <h3>Loading...</h3>;
  }
  return (
    <main className="max-w-md px-2 mx-auto">
       <h1 className="text-2xl text-center mt-8 font-bold">Create Your Store</h1>
          <form onSubmit={onSubmit}>
            <p className="text-lg mt-5 font-semibold">Shopping</p>
              <div className="flex">
              <button
            type="button"
            id="type"
            value="shopping"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "events"
                ? "btn btn-info"
                : "btn btn-primary"   
            }`}
          >
            Shopping
          </button>
          <button
            type="button"
            id="type"
            value="events"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "shopping"
              ? "btn btn-info"
              : "btn btn-primary"  
            }`}
          >
            Events
          </button>
        </div>
        <p className="text-lg mt-5 font-semibold">Name</p>
            <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Full Name"
            maxLength="32"
            minLength="10"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 
            bg-white border border-gray-300 rounded transition duration-150 
            ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />        
       
  
        <p className="text-lg mt-6 font-semibold">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />

        <div className="mb-6">
          <p className="text-lg font-semibold">Image</p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button type="submit" className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium 
        text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
        focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Create Shopping</button>
      </form>
    </main>
  );
}