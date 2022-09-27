import React from "react";
import { Oval } from "react-loader-spinner";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children, loading }) {
  return (
    <div id="main-layout">
      {loading ? (
        <div className="vh-100 vw-100 position-fixed d-flex align-items-center justify-content-center top-0 left-0 right-0 bottom-0 overlay">
          <Oval color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <>
          <header className="mb-5">
            <Navbar />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </>
      )}
    </div>
  );
}
