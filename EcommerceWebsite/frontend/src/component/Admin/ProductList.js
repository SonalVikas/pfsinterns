// import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
// import "./ProductList.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getAdminProduct,
//   deleteProduct,
// } from "../../actions/productAction";
// import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
// import { Button } from "@material-ui/core";
// import MetaData from "../layout/MetaData";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// import SideBar from "./Sidebar";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

// const ProductList = ({ history }) => {
//   const dispatch = useDispatch();

//   const alert = useAlert();

//   const { error, products } = useSelector((state) => state.products);

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.product
//   );

//   const deleteProductHandler = (id) => {
//     dispatch(deleteProduct(id));
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (deleteError) {
//       alert.error(deleteError);
//       dispatch(clearErrors());
//     }

//     if (isDeleted) {
//       alert.success("Product Deleted Successfully");
//       history.push("/admin/dashboard");
//       dispatch({ type: DELETE_PRODUCT_RESET });
//     }

//     dispatch(getAdminProduct());
//   }, [dispatch, alert, error, deleteError, history, isDeleted]);

//   const columns = [
//     { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

//     {
//       field: "name",
//       headerName: "Name",
//       minWidth: 350,
//       flex: 1,
//     },
//     {
//       field: "stock",
//       headerName: "Stock",
//       type: "number",
//       minWidth: 150,
//       flex: 0.3,
//     },

//     {
//       field: "price",
//       headerName: "Price",
//       type: "number",
//       minWidth: 270,
//       flex: 0.5,
//     },

//     {
//       field: "actions",
//       flex: 0.3,
//       headerName: "Actions",
//       minWidth: 150,
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <Fragment>
//             <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
//               <EditIcon />
//             </Link>

//             <Button
//               onClick={() =>
//                 deleteProductHandler(params.getValue(params.id, "id"))
//               }
//             >
//               <DeleteIcon />
//             </Button>
//           </Fragment>
//         );
//       },
//     },
//   ];

//   const rows = [];

//   products &&
//     products.forEach((item) => {
//       rows.push({
//         id: item._id,
//         stock: item.Stock,
//         price: item.price,
//         name: item.name,
//       });
//     });

//   return (
//     <Fragment>
//       <MetaData title={`ALL PRODUCTS - Admin`} />

//       <div className="dashboard">
//         <SideBar />
//         <div className="productListContainer">
//           <h1 id="productListHeading">ALL PRODUCTS</h1>

//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             className="productListTable"
//             autoHeight
//           />
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProductList;
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import {useNavigate} from "react-router-dom";
const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
const navigate=useNavigate();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <TableContainer component={Paper}>
            <Table aria-label="product table">
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <Link to={`/admin/product/${product._id}`}>
                        <EditIcon />
                      </Link>
                      <Button onClick={() => deleteProductHandler(product._id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
