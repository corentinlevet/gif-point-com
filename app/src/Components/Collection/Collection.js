import Button from "react-bootstrap/Button";
import React, { useEffect, useRef, useState } from "react";
import expressServer from "../../api/express-server";

import './Collection.css'

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

function displayMyImages({ fileInputRef, myImages, setMyImages }) {
  const openFileUpload = (fileInputRef) => (e) => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (e) => {
    const selectedFiles = e.target.files;
    for (const file of selectedFiles) {
      if (file && (file.name.endsWith(".png") || file.name.endsWith(".jpg"))) {
        const newImg = URL.createObjectURL(file);
        setMyImages([...myImages, newImg]);

        try {
          const base64 = await blobToBase64(file);
          expressServer.saveImage(1, base64);
        } catch (e) {
          console.log("Error saving image: ", e);
        }
      } else {
        alert("Sélectionnez un fichier .png ou .jpg valide.");
      }
    }
  };

  return (
    <div id="myImages" style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <h2>My Images</h2>
        <input type="file" multiple accept=".png, .jpg" onChange={handleFileUpload} style={{ display: "none" }} ref={fileInputRef} />
        <Button className="add-button" style={{ marginLeft: "20px" }} onClick={openFileUpload(fileInputRef)}>+</Button>
      </div>
      {
        myImages.map((image, index) =>  {
          return (
            <img key={index} src={image} style={{ width: "200px", height: "200px", margin: "20px", borderRadius: "20px", objectFit: "cover" }} />
          );
        })
      }
    </div>
  );
}

function displayMyGIFs({ myGIFs, setMyGIFs }) {
  return (
    <div id="myGIFs" style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <h2>My GIFs</h2>
      </div>
      {
        myGIFs.map((gif, index) =>  {
          return (
            <img key={index} src={gif} style={{ width: "200px", height: "200px", margin: "20px", borderRadius: "20px", objectFit: "cover" }} />
          );
        })
      }
    </div>
  );
}

function Collection() {
  const fileInputRef = useRef(null);
  const [myImages, setMyImages] = useState([]);
  const [myImagesLoaded, setMyImagesLoaded] = useState(false);
  const [myGIFs, setMyGIFs] = useState([]);
  const [myGIFsLoaded, setMyGIFsLoaded] = useState(false);

  useEffect(() => {
    expressServer.getMyImages(1).then((res) => {
      const imagesBase64 = res.data.map((image) => image.base64);
      setMyImages(imagesBase64);

      setMyImagesLoaded(true);
    });

    expressServer.getMyGIFs(1).then((res) => {
      const gifsBase64 = res.data.map((gif) => gif.base64);
      setMyGIFs(gifsBase64);

      setMyGIFsLoaded(true);
    });
  }, []);

  return (
    <div>
      {
        myImagesLoaded && displayMyImages({ fileInputRef, myImages, setMyImages })
      }
      {
        myGIFsLoaded && displayMyGIFs({ myGIFs, setMyGIFs })
      }
    </div>
  );
}

export default Collection;
