import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import {Wallet} from "lucide-react"

function SideBar() {
    
  const [view, setView] = useState("Dashboard")
  return (
    <>
    <div className="flex flex-row items-center justify-between text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base ms-3 mt-3 text-sm p-2 focus:outline-none md:hidden">
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" >
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
   </svg>
</button>
<div className="flex flex-row gap-1 items-center">

              <Wallet size={20} />
<h2 className="mr-2">SpendWise</h2>
</div>


    </div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-84 h-full transition-transform -translate-x-full md:translate-x-0 max-lg:w-70 max-md:w-64"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft bg-white">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center mt-6 ml-2">
              <Wallet size={36} />
              <h1 className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">SpendWise</h1>
            </div>

            <div className="space-y-2 font-medium mt-8 flex flex-col gap-6">
              <NavLink
                to={""}
                href="javascript:void(0)"
                className={({ isActive }) =>
                  `${isActive ? `text-purple-600 ${setView("Dashboard")}` : "text-gray-500"
                 } font-medium text-[15px] flex gap-4 items-center rounded px-3 py-2 transition-all`
                }
              >
                <i className="fa-solid fa-house fa-xl lg:fa-lg"></i>
                <span className="text-2xl max-lg:text-xl max-md:text-lg">Dashboard</span>
              </NavLink>
              <NavLink
                to={"/history"}
                href="javascript:void(0)"
                className={({ isActive }) =>
                  `${isActive ? `text-purple-600 ${setView("History")}` : "text-gray-500"}font-medium text-[15px] flex gap-3 items-center rounded px-3 py-2 transition-all`
                }
              >
                <i className="fa-solid fa-clock-rotate-left fa-xl lg:fa-lg"></i>
                <span className="text-2xl max-lg:text-xl max-md:text-lg">History</span>
              </NavLink>
            </div>
          </div>
        </div>
      </aside>

      <div className="px-10 max-md:px-8 max-sm:px-4 md:ml-70 bg-gray-200 lg:ml-84">
        <Navbar view={view} />
        <Outlet />
      </div>
    </>
  );
}

export default SideBar;
