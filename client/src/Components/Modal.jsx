import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Modal = ({ isVisible, onClose, userId }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [message, setMessage] = useState('');

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageName = ref(storage, `${userId}`);
    const imageRef = ref(storage, imageName);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls([...imageUrls, url]);
        setMessage('La imagen se subió exitosamente.');
      }).catch((error) => {
        setMessage('A ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
      });
    }).catch((error) => {
      setMessage('La carga falló. Por favor, inténtelo de nuevo más tarde.');
    });
  };

  const handleFileChange = (event) => {
    setImageUpload(event.target.files[0]);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div onClick={onClose} className="overlay absolute w-full h-full bg-gray-900 opacity-0 "></div>
      <div className="bg-white p-5 rounded-lg shadow-lg z-50 overflow-y-auto translate-y-full ">
        <input type="file" onChange={handleFileChange} className="text-black" />
        <button onClick={uploadImage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-out duration-300 text-black mt-4">
          Subir Imagen
        </button>
        {message && <div className="text-black">{message}</div>}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-orange-claro text-white rounded hover:bg-orange-claro transition ease-out duration-300 ml-4">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
