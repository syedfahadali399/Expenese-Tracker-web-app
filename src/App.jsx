import { Route, Routes } from "react-router-dom"
import SideBar from "./components/SideBar"
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"
import History from "./components/History"
import DataContextProvider from "./context/DataContextProvider"

function App() {

  return (
    <>
    <DataContextProvider>
      <Routes>
        <Route path="/" element={<SideBar/>}>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/history" element={<History/>}/>
        </Route>
        <Route path="/" element={<Navbar/>}/>
      </Routes>
    </DataContextProvider>
    </>
  )
}

export default App
