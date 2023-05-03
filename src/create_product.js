import React, { useState } from "react";
import axios from "axios";

export default function Createform() {
  const [product_name, setproduct_Name] = useState("");
  const [original_price, setoriginal_Price] = useState("");
  const [sale_price, setsale_Price] = useState("");
  const [product_type, setproduct_Type] = useState("");
  const [description, set_Description] = useState("");
  const [product_name_error, setproduct_Name_error] = useState("");
  const [original_price_error, setoriginal_Price_error] = useState(0);
  const [sale_price_error, setsale_Price_error] = useState(0);
  const [product_type_error, setproduct_Type_error] = useState(0);
  const [description_error, set_Description_error] = useState("");

  let clearForm = () => {
    setproduct_Name_error("");
    setoriginal_Price_error("");
    setsale_Price_error("");
    setproduct_Type_error("");
    set_Description_error("");
  };

  const handleCreate = async () => {
    await clearForm();
    let formisValid = true;
    if (product_name === "") {
      setproduct_Name_error("*Product Name is required.");
      formisValid = false;
    } else if (product_name.length < 2) {
      setproduct_Name_error("*Enter valid Product Name.");
      formisValid = false;
    } else if (!product_name.match("^[a-zA-Z]*$")) {
      setproduct_Name_error("*Only characters are accepted.");
      formisValid = false;
    }
    if (original_price === "") {
      setoriginal_Price_error("*Original Price is required.");
      formisValid = false;
    } else if (original_price < 0) {
      setoriginal_Price_error("*Enter valid original price.");
      formisValid = false;
    }
    if (sale_price === "") {
      setsale_Price_error("*Sale Price is required.");
      formisValid = false;
    } else if (sale_price < 0) {
      setsale_Price_error("*Enter valid sale price.");
      formisValid = false;
    }
    if (product_type === "") {
      setproduct_Type_error("*Product Type is required.");
      formisValid = false;
    } else if (product_type.length < 0) {
      setproduct_Type_error("*Product Type must be greater than 0.");
      formisValid = false;
    } else if (!product_type.toString().match("^[1-9][0-9]*$")) {
      setproduct_Type_error("Enter valid product type");
      formisValid = false;
    }
    if (description === "") {
      set_Description_error("*Description is required.");
      formisValid = false;
    } else if (description.length > 100) {
      set_Description_error("*Not More Than 100 Characters.");
    } else if (description.length < 3) {
      set_Description_error("*Enter valid Description.");
    }
    if (!formisValid) {
      return;
    }
    const config = {
      headers: {
        api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
      },
    };
    const reqObj = {
      product_name: product_name,
      original_price: original_price,
      sale_price: sale_price,
      product_type: parseInt(product_type),
      description: description,
    };
    const result = await axios.post(
      "https://lobster-app-ddwng.ondigitalocean.app/product/add_new",
      reqObj,
      config
    );
    console.log("pro", product_type);

    if (result.status) {
      setproduct_Name("");
      setoriginal_Price("");
      setsale_Price("");
      setproduct_Type("");
      set_Description("");
      console.log("Successfully created a product");
    } else {
      console.log("oops! something went wrong");
    }
  };

  return (
    <div className="form">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
      ></link>
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <h1 className="heading">Create New Product</h1>
      <div class="card">
        <div class="card-body">
          <input
            type="text"
            placeholder="Product Name"
            id="PN"
            onChange={(e) => setproduct_Name(e.target.value)}
            value={product_name}
            required
          />
          {product_name_error ? (
            <small className="ProductName-Error">{product_name_error}</small>
          ) : (
            ""
          )}
          <br></br>
          <input
            type="number"
            placeholder="Original Price"
            id="OP"
            onChange={(e) => setoriginal_Price(e.target.value)}
            value={original_price}
            required
          />
          {original_price_error ? (
            <small className="OriginalPrice-Error">
              {original_price_error}
            </small>
          ) : (
            ""
          )}
          <br></br>
          <input
            type="number"
            placeholder="Sale Price"
            id="SP"
            onChange={(e) => setsale_Price(e.target.value)}
            value={sale_price}
            required
          />
          {sale_price_error ? (
            <small className="SalePrice-Error">{sale_price_error}</small>
          ) : (
            ""
          )}
          <br></br>

          <form className="app">
            <select
              className="btnn"
              onClick={(e) => setproduct_Type(e.target.value)}
            >
              <option>Select Product Type</option>
              <option value="1">Consumer Product</option>
              <option value="2">Domestic Product</option>
              <option value="3">Commercial Product</option>
              <option value="4">Industrial Product</option>
              <option value="5">Service Product</option>
            </select>
          </form>

          <br></br>
          <input
            type="text"
            placeholder="Description"
            id="DS"
            onChange={(e) => set_Description(e.target.value)}
            value={description}
            required
          />
          {description_error ? (
            <small className="descriptionError">{description_error}</small>
          ) : (
            ""
          )}
          <br></br>
          <button type="button" id="crc" onClick={() => handleCreate()}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
