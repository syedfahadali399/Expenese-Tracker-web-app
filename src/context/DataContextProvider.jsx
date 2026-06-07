import { useEffect, useState } from "react";
import DataContext from "./DataContext";

const DataContextProvider = ({children}) => {

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("data")
    return saved? JSON.parse(saved): [];
  });

  const [totalMoney, setTotalMoney] = useState(() => {
    const saved = localStorage.getItem("totalmoney")
    return saved? JSON.parse(saved): 0;
  });

  const [totalIncome, setTotalIncome] = useState(() => {
    const saved = localStorage.getItem("totalincome")
    return saved? JSON.parse(saved): 0;
  });

  const [totalExpense, setTotalExpense] = useState(() => {
    const saved = localStorage.getItem("totalexpense")
    return saved? JSON.parse(saved): 0;
  });

  const [date, setDate] = useState(() => {
    const saved = localStorage.getItem("date")
    return saved? JSON.parse(saved): ""
  })

  const [activeTab, setactiveTab] = useState(() => {
    const saved = localStorage.getItem("activeTab");
    return saved ? JSON.parse(saved) : "expense";
  });

  useEffect(() => {
    localStorage.setItem("totalmoney", JSON.stringify(totalMoney))
    localStorage.setItem("totalincome", JSON.stringify(totalIncome))
    localStorage.setItem("totalexpense", JSON.stringify(totalExpense))
    localStorage.setItem("data", JSON.stringify(data))
    localStorage.setItem("date", JSON.stringify(date))
    localStorage.setItem("activeTab", JSON.stringify(activeTab))
  }, [totalMoney, totalIncome, totalExpense, data, date, activeTab])

    return(
        <DataContext.Provider value={{data, setData, totalMoney, setTotalMoney, totalIncome, setTotalIncome, totalExpense, setTotalExpense, activeTab, setactiveTab, date, setDate}}>
           {children}
        </DataContext.Provider>
    )
    
    
}

export default DataContextProvider;