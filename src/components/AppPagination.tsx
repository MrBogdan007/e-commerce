import React from "react";
import Pagination from "@mui/material/Pagination";

const style: any = {
  root: {
    bottom: 0,
    zIndex: 200,
    backgroundColor: "yellow",
    padding: "10px 80px",
    color: "white",
    width: "100%",
    position: "fixed",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
};


const AppPagination = ({ setPage, page }) => {
   const handleChange = (page) => {
      setPage(page)
      window.scroll(0,0)
   }
  return (
    <div style={style.container} className="container">
      <div style={style.root} className="root">
        <Pagination
        onChange={(e) => handleChange(e.target.textContent)}
          style={{ display: "flex", justifyContent: "center" }}
          variant="outlined"
          count={page}
        />
      </div>
    </div>
  );
};

export default AppPagination;
