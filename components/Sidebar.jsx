import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Sidebar.module.css";

const Sidebar = (props) => {
  const {
    SidebarContainer,
    SidebarWrapper,
    SidebarList,
    CloseSidebar,
    SidebarWrapperNight,
    SidebarListNight,
  } = styles;

  return (
    <div
      style={
        props.openSidebar
          ? { width: "100%", background: "#0009" }
          : { width: "0%", background: "#fff" }
      }
      className={SidebarContainer}
      //   onClick={props.handleSidebarClose}
    >
      <div
        className={props.night ? SidebarWrapperNight : SidebarWrapper}
        style={!props.openSidebar ? { right: "-900px" } : { right: "0" }}
      >
        <div onClick={props.handleSidebarClose} className={CloseSidebar}>
          <Image width={30} height={30} src="/close.svg" alt="close" />
        </div>
        <ul className={props.night ? SidebarListNight : SidebarList}>
          {["ABOUT", "HOW IT WORKS", "WHAT IS SOLANA", "FAQS"].map((item) => (
            <li key={item}>
              {item}{" "}
              <span>
                <Image width={30} height={30} src="/go.svg" alt="go" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
