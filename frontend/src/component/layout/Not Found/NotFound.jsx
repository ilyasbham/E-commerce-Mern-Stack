import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon fontSize="large" color="error" />
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;

// import React from "react";
// import { Link } from "react-router-dom";
// import "./NotFound.css";

// const NotFound = () => {
//   return (
//     <div>
//       <header className="top-header"></header>

//       {/* Dust particles */}
//       <div>
//         <div className="starsec"></div>
//         <div className="starthird"></div>
//         <div className="starfourth"></div>
//         <div className="starfifth"></div>
//       </div>

//       {/* Lamp */}
//       <div className="lamp__wrap">
//         <div className="lamp">
//           <div className="cable"></div>
//           <div className="cover"></div>
//           <div className="in-cover">
//             <div className="bulb"></div>
//           </div>
//           <div className="light"></div>
//         </div>
//       </div>

//       {/* Error Content */}
//       <section className="error">
//         <div className="error__content">
//           <div className="error__message message">
//             <h1 className="message__title">Page Not Found</h1>
//             <p className="message__text">
//               We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our homepage.
//             </p>
//           </div>
//           <div className="error__nav e-nav">
//             <Link to="/" className="e-nav__link"></Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default NotFound;
