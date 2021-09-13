import React, {useState, useEffect} from 'react'
import {storage} from '../firebase/config'
import { v4 as uuidv4 } from 'uuid';

export default function useStorage(defaultPreview=null) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(defaultPreview);
      return;
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file, defaultPreview])


  const handleInputImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null)
      return
    }
    setFile(e.target.files[0]);
    e.target.value = "";
  }

  const removeImage = () => {
    setPreview(null);
    setFile(null);
  }

  const uploadImage = async () => {
    if (file && preview) {
      const storageRef = storage.ref(`${uuidv4()}-${file.name}`);

      const url = await storageRef.put(file)
      .then( async () => await storageRef.getDownloadURL())

      removeImage();

      return url;
    }
    else {
      return null;
    }
  }

  return [preview, file, handleInputImage, uploadImage, removeImage]
}
