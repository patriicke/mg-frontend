import React, { PropsWithChildren } from "react";
import { useState } from "react";

import NavBar from "components/NavBar/NavBar";
import SideBar from "components/SideBar/SideBar";
import MobileFooter, { WebFooter } from "./Footer/Footer";
import { useMediaQuery } from "react-responsive";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
    if(isMobile){
      let element = document.getElementById("root")
      if(!isCollapsed){
        element?.classList.add('bg-fixed')
      }else{
        element?.classList.remove('bg-fixed')
      }
    }
  };

  return (
    <div className="min-w-full bg-primary-bg-color font-graphit scroll-smooth text-primary-color pb-[72px] lg:pb-0">
      <div className="">
        <SideBar isCollapsed={isCollapsed} toggleCollpase={toggleCollapse} />
      </div>
      <main
        className={
          `relative flex flex-col justify-center w-full overflow-y-scroll ` +
          (isCollapsed ? 'lg:pl-[102px]' : 'lg:pl-[240px]')
        }
        id="main"
      >
        <div className="w-full flex flex-col items-center">
          <NavBar isCollapsed={isCollapsed} />
          <div className="w-full max-w-[var(--max-width)] px-[19px] pt-[80px]">
            {children}
            {isMobile ? (
              <MobileFooter onClick={toggleCollapse} />
            ) : (
              <WebFooter />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
