import { Outlet, Link } from "react-router-dom";
import { NoTokensMessage } from "../token/NoTokensMessage";

const Layout = ({ selectedAddress, balance, tokenData }) => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3>
            Welcome <b>{selectedAddress}</b>, you have{" "}
            <b>
              {balance.toString()} {tokenData}
            </b>
            .
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {/*
              If the user has no tokens, we don't show the Transfer form
            */}
          {balance.eq(0) && (
            <NoTokensMessage selectedAddress={selectedAddress} />
          )}
        </div>
      </div>
      <hr />
    
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <hr />
      <Outlet />
    </>
  );
};

export default Layout;
