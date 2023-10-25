import Button from "react-bootstrap/Button";
import React, { useRef } from "react";

import './Collection.css'

function displayMyImages({ fileInputRef }) {
  const openFileUpload = (fileInputRef) => (e) => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".png")) {
      const base64 = URL.createObjectURL(selectedFile);
      const img = document.createElement("img");
      img.src = base64;
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.margin = "10px";
      img.style.borderRadius = "10px";
      img.style.objectFit = "cover";

      const myImages = document.getElementById("myImages");
      myImages.appendChild(img);
    } else {
      alert("Sélectionnez un fichier .png valide.");
    }
  };

  return (
    <div id="myImages" style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <h2>My Images</h2>
        <input type="file" accept=".png" onChange={handleFileUpload} style={{ display: "none" }} ref={fileInputRef} />
        <Button className="add-button" style={{ marginLeft: "20px" }} onClick={openFileUpload(fileInputRef)}>+</Button>
      </div>
    </div>
  );
}


function displayMyGIFs() {
  return (
    null
  );
}

function Collection() {
  const fileInputRef = useRef(null);

  return (
    <div>
      {displayMyImages({ fileInputRef })}
      {displayMyGIFs()}
    </div>
  );
}

export default Collection;
