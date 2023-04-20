import React from 'react';
import ReactLoading from 'react-loading';

function Loading () {
    return (
     <div className="loading-animation" style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft: "-50px",
        width: "100px",
        height: "100px" }}>
       <ReactLoading color="#8564bf" type="spokes" width={64} height={64}  />
     </div>
    );
  }

export default Loading;