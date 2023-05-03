import React from "react";

export default function Welcome() {
  return (
    <form className="main">
      <div className="btns">
        <h1 className="wel">Welcome Back</h1>
        <a href="/product">
          <button type="button" className="pro">
            {" "}
            Click Me To List Product
          </button>
        </a>
        <br></br>
        <a href="/create_product">
          <button type="button" className="crt">
            Click Me To Create New Product{" "}
          </button>
        </a>
      </div>
    </form>
  );
}
