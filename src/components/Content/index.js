import React from "react";
import "./Content.css";

const Content = props => {
  const {
    breedImages,
    name,
    fontColor: color,
    fontFamily,
    fontSize,
    isLoading
  } = props;
  const styles = {
    dogName: {
      color,
      fontFamily,
      fontSize: fontSize + "px"
    }
  };
  return (
    <div className="content">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="dog-name_wrapper">
            <p className="dog-name" style={styles.dogName}>
              {name}
            </p>
          </div>
          <img className="breed-image" src={breedImages[0]} alt="dog breed" />
        </>
      )}
    </div>
  );
};

export default Content;
