import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("Dashboard");
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/history") {
      setView("History");
    } else {
      setView("Dashboard");
    }
  }, [location]);

  return (
    <>
      <div className="flex flex-row items-center justify-between bg-white shadow-sm px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h10"
            />
          </svg>
        </button>
        <div className="flex flex-row gap-1 items-center">
          <Wallet size={20} />
          <h2 className="font-bold text-lg">SpendWise</h2>
        </div>
        <div className="w-10" />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 lg:w-84 max-lg:w-70`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
          <button
            className="md:hidden absolute top-3 right-3 p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center mt-6 ml-2">
              <Wallet size={36} />
              <h1 className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">
                SpendWise
              </h1>
            </div>

            <div className="space-y-2 font-medium mt-8 flex flex-col gap-6">
              <NavLink
                to={""}
                end
                className={({ isActive }) =>
                  `${
                    isActive ? "text-purple-600" : "text-gray-500"
                  } font-medium text-[15px] flex gap-4 items-center rounded px-3 py-2 transition-all hover:bg-purple-50`
                }
              >
                <i className="fa-solid fa-house fa-xl lg:fa-lg"></i>
                <span className="text-2xl max-lg:text-xl max-md:text-lg">
                  Dashboard
                </span>
              </NavLink>

              <NavLink
                to={"/history"}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-purple-600" : "text-gray-500"
                  } font-medium text-[15px] flex gap-3 items-center rounded px-3 py-2 transition-all hover:bg-purple-50`
                }
              >
                <i className="fa-solid fa-clock-rotate-left fa-xl lg:fa-lg"></i>
                <span className="text-2xl max-lg:text-xl max-md:text-lg">
                  History
                </span>
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
