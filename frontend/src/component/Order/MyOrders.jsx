
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import "react-toastify/dist/ReactToastify.css";
import "./myOrders.css";


const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
      <span className={params.row.status === "Delivered" ? "greenColor" : "redColor"}>
        {params.row.status}
      </span>)
    },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.row.id}`}>
          <LaunchIcon />
        </Link>
      ),
    },
  ];

  const rows = orders?.map((item) => ({
    id: item._id,
    status: item.orderStatus,
    itemsQty: item.orderItems.length,
    amount: item.totalPrice,
  })) || [];

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="myOrdersTable"
          />
          <Typography id="myOrdersHeading" variant="h5" sx={{ mt: 2 }}>
            {user.name}'s Orders
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
