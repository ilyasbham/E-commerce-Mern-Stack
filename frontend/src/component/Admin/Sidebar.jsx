import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  // Example toast alert
  const showAlert = () => {
    toast.info("Welcome to Admin Dashboard!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  React.useEffect(() => {
    showAlert();
  }, []);

  return (
    <div className="sidebar">
      <ToastContainer />
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>

      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <TreeItem nodeId="1" label="Products">
          <TreeItem
  nodeId="2"
  label={
    <Link to="/admin/products" className="treeLink">
      <p><PostAddIcon /> All Products</p>
    </Link>
  }
/>

<TreeItem
  nodeId="3"
  label={
    <Link to="/admin/product" className="treeLink">
      <p><AddIcon /> Create Product</p>
    </Link>
  }
/>

        </TreeItem>
      </TreeView>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
