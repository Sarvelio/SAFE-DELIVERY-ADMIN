import React from "react";

export const Header = () => {
  return (
    <header className=" container-fluid bg-blue py-3 text-center text-light">
      <div className="container d-flex justify-content-between">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-white fw-bold">SAFE DELIVERY</span>
        </div>

        <div className="col-md-4 d-flex align-items-center text-white">
          <span className="mb-3 mb-md-0 text-white">!Bienvenido!</span>
        </div>
      </div>
    </header>
  );
};
