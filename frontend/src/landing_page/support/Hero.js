import React from "react";

function Hero() {
  return (
    <div className="container mt-5">
      
      {/* Top Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Support Portal</h1>

        <button className="btn btn-primary px-4 py-2">
          My tickets
        </button>
      </div>

      {/* Search Bar */}
      <div className="row">
        <div className="col-12">
          <div className="position-relative">
            <input
              type="search"
              className="form-control ps-5"
              placeholder="Eg: How do I open my account, How do I activate F&O..."
              style={{
                height: "55px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            />
            <span
              className="position-absolute"
              style={{
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6c757d",
                fontSize: "18px",
              }}
            >
              🔍
            </span>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <hr/>

    </div>
    
  );
}

export default Hero;
