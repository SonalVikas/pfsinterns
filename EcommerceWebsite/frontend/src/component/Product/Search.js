// import React, { useState, Fragment } from "react";
// import MetaData from "../layout/MetaData";
// import "./Search.css";
// import { useNavigate } from "react-router-dom";
// // import { browserHistory} from 'react-router';
// const Search = ({ history }) => {
//   const [keyword, setKeyword] = useState("");
//  // const history = useHistory();
//  const navigate = useNavigate();

//   const searchSubmitHandler = (e) => {
//     e.preventDefault();
   
//     if (keyword.trim()) {
//         navigate.push(`/products/${keyword}`);
//     } else {
//         navigate.push("/products");
//     }
//   };

//   return (
//     <Fragment>
//       <MetaData title="Search A Product -- ECOMMERCE" />
//       <form className="searchBox" onSubmit={searchSubmitHandler}>
//         <input
//           type="text"
//           placeholder="Search a Product ..."
//           onChange={(e) => setKeyword(e.target.value)}
//         />
//         <input type="submit" value="Search" />
//       </form>
//     </Fragment>
//   );
// };

// export default  Search;
import React, { useState,Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
   
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    
     
      <Fragment>
     <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
           type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
         <input type="submit" value="Search" />
       </form>
    </Fragment>
  );
};

export default Search;
