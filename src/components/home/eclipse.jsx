import React from 'react';


const Shape = () => {
  return (
    <div className="h-[14em] mb-16 mx-auto ">
      {/* <div className="shape"></div> */}
      <div class="eclipse-container ">
        <img
          src="./ecllipse.png"
          alt="Eclipse Image"
          class="eclipse w-[40%] max-md-[600px]:w-[65%]"
        />
      </div>
    </div>
  );
};

export default Shape;
