import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";
import moment from "moment";


export default function Getmethod() {
  const [rowsPerPage] = useState(10);
  const [offset, setOffset] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [final_list, set_final_list] = useState([]);
  const [search, set_search] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [dropValue, setdropValue] = useState("");
  useEffect(() => {
    if (search === "") {
      getdata();
    } else {
      onSearch();
    }
  }, [offset]);

  const getdata = async () => {
    const config = {
      headers: {
        api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
      },
    };
    const result = await axios.get(
      "https://lobster-app-ddwng.ondigitalocean.app/product/list",
      config
    );

    set_final_list(result.data.message);
    await funcPagination(result.data.message);
  };

  const funcPagination = (param) => {
    const slice = param.slice(offset - 1, offset - 1 + rowsPerPage);
    var get_no_pages = Math.ceil(param.length / 10);
    setPageCount(get_no_pages);
    setFilteredData(slice);
  };
  const handlePageClick = (event) => {
    const selectedPage = event.selected * rowsPerPage;
    setOffset(selectedPage + 1);
  };

  const onSearch = async () => {
    let filtered = [];
    if (dropValue === "_id") {
      filtered = final_list.filter((user) =>
        user._id.toString().includes(search)
      );
    } else if (dropValue === "product_name") {
      filtered = final_list.filter((user) =>
        user.product_name.toLowerCase().includes(search.toLowerCase())
      );
    } else if (dropValue === "original_price") {
      filtered = final_list.filter((user) =>
        user.original_price.toLowerCase().includes(search.toLowerCase())
      );
    } else if (dropValue === "sale_price") {
      filtered = final_list.filter((user) =>
        user.sale_price.toLowerCase().includes(search.toLowerCase())
      );
    } else if (dropValue === "product_type") {
      filtered = final_list.filter((user) =>
        user.product_type.toLowerCase().includes(search.toLowerCase())
      );
    } else if (dropValue === "description") {
      filtered = final_list.filter((user) =>
        user.description.toLowerCase().includes(search.toLowerCase())
      );
    } else if (dropValue === "date_n_time") {
      filtered = final_list.filter((user) =>
        user.date_n_time.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      filtered = final_list.filter((user) =>
        user.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }
    funcPagination(filtered);
  };

  const handleSearch = async () => {
    setOffset(1);
    setFilteredData([]);
    onSearch();
  };
  const restore = async (searchValue) => {
    await set_search(searchValue);
    if (searchValue === "") {
      getdata();
    } else {
      onSearch();
    }
  };

  return (
    <div className="main">
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
      <div className="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="headings">All Products</h2>
          </div>
          <div class="col-md-6 text-right">
            <form className="app">
              <select
                className="filterDP"
                onClick={(e) => setdropValue(e.target.value)}
              >
                <option>Filter</option>
                <option value="_id">Product Id</option>
                <option value="product_name">Product Name</option>
                <option value="original_price">Original Price</option>
                <option value="sale_price">Sale Price</option>
                <option value="product_type">Product Type</option>
                <option value="description">Description</option>
                <option value="date">Date and Time</option>
              </select>
            </form>
            <input
              type="text"
              id="srchbox"
              placeholder="Search"
              onChange={(e) => restore(e.target.value)}
            ></input>
            <button
              type="button"
              id="srchicon"
              onClick={() => handleSearch(true)}
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <table className="text">
            <tr>
              <th>Date and Time</th>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Original Price</th>
              <th>Sale Price</th>
              <th>Product Type</th>
              <th>Description</th>
            </tr>

            {search !== "" && filteredData.length === 0 ? (
              <td colspan="7">NO RECORD FOUND</td>
            ) : (
              filteredData.map((item) => (
                <tr>
                  <td>{moment(item.date_n_time).format("DD-MM-YYYY")}</td>
                  <td>{item._id}</td>
                  <td>{item.product_name}</td>
                  <td>
                    {item.original_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    {item.sale_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}


                  </td>
                  <td>{parseInt(item.product_type)===1 ? "consumer":
                   parseInt(item.product_type)===2 ?"domestic":
                   parseInt(item.product_type)===3 ?"commercial":
                   parseInt(item.product_type)===4 ? "industrial":
                   parseInt(item.product_type)===5 ? "service":
                    "others" }</td>
                  <td>
                    {item.description.length > 15
                      ? item.description.slice(0, 20).concat("...")
                      : item.description}
                  </td>
                </tr>
              ))
            )}
          </table>
        </div>
      </div>

      {filteredData.length >= rowsPerPage ? (
        <ReactPaginate
          className="page-btn"
          breakLabel={"..."}
          nextLabel={"NEXT"}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel={"PREVIOUS"}
          disabledClassName={"PREVIOUS"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName="pagination"
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      ) : null}
    </div>
  );
}
