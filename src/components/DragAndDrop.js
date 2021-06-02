import React, { useRef } from "react";
import styles from "./DragAndDrop.module.css";
import Button from "./Button";

const DragAndDrop = ({ label, onFileUpload, imageUrl }) => {
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (!file?.type.match("image/*")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const preview = reader.result;

      if (onFileUpload) {
        onFileUpload(file, preview);
      }
    };

    reader.onerror = (error) => {
      console.error(error);
    };
    reader.readAsDataURL(file);
  };
  const inputFileRef = useRef(null);

  return (
    <>
      <div className={styles.dragAndDrop}>
        <div className={styles.label}>{label}</div>
        <div className={styles.contentContainer}>
          <input
            type="file"
            className={styles.fileInput}
            onChange={onFileChange}
            accept="image/*"
            ref={inputFileRef}
          />
          {imageUrl ? (
            <div
              style={{ backgroundImage: `url("${imageUrl}")` }}
              className={styles.image}
            ></div>
          ) : (
            <div className={styles.text}>Drag and drop image</div>
          )}
          {!imageUrl && (
            <Button
              color={"turqouise"}
              onClick={(e) => {
                inputFileRef.current.click();
                e.preventDefault();
              }}
            >
              Upload
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;
