import { useContext } from "react";
import DataContext from "../context/DataContext";

function Navbar({view}) {

    const {setTotalMoney, setTotalIncome, setTotalExpense, setData, date, setDate} = useContext(DataContext);

    const clearData = () => {
        setTotalMoney(0);
        setTotalIncome(0);
        setTotalExpense(0)
        setData([]);
        setDate("")
    }

    const getDate = (e) => {
        let value = e.target.value;
        setDate(value)
    }
  return (
    <>
      
        <div className="flex flex-row justify-between items-center py-10 max-xl:py-8">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold max-xl:text-3xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl">{view}</h1>
                <p className="text-lg font-normal max-md:text-base max-sm:text-xs">Welcome back, track your flow</p>
            </div>
            <div className="flex flex-row gap-4 items-center max-lg:flex-col">
            <button onClick={clearData} className="w-20 flex justify-center text-center cursor-pointer text-base font-semibold border-purple-600 bg-purple-600 text-white rounded-4xl p-2 border-2 max-sm:text-xs">
               Reset 
            </button>
            <div className="cursor-pointer bg-white border-purple-600 rounded-4xl p-2 border-2 max-sm:w-28">
                <input className="max-sm:w-24" value={date} onChange={getDate} type="date" placeholder="January"/>
            </div>
            </div>
        </div>
      
    </>
  );
}

export default Navbar;
