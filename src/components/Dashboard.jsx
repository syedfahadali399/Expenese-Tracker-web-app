import { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { Trash2, CircleArrowDown, CircleArrowUp } from "lucide-react";

function Dashboard() {

  const navigate = useNavigate();

  const tabs = [
    { id: "expense", label: "Expense" },
    { id: "income", label: "Income" },
  ];

  const toHistory = () => {
    navigate("/history");
  };

  const {
    data,
    setData,
    totalMoney,
    setTotalMoney,
    totalIncome,
    setTotalIncome,
    totalExpense,
    setTotalExpense,
    activeTab,
    setactiveTab,
  } = useContext(DataContext);

  const [form, setForm] = useState({
    type: "",
    amount: "",
    category: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      type: activeTab,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.amount ||
      !form.category ||
      form.category === "Choose" ||
      !form.notes
    ) {
      return;
    }

    updateAmount(Number(form.amount));

    setForm({
      type: "",
      amount: "",
      category: "",
      notes: "",
    });
  };

  const updateAmount = (amount) => {
    const newAmount = amount;
    if (form.type === "income") {
      setTotalMoney((prev) => prev + newAmount);
      setTotalIncome((prev) => prev + newAmount);
      setData((prev) => [...prev, form]);
    }

    if (form.type === "expense") {
      if (totalMoney > 0) {
        setTotalMoney((prev) => prev - newAmount);
        setTotalExpense((prev) => prev + newAmount);
        setData((prev) => [...prev, form]);
      } else {
        alert("add some money");
      }
    }
  };

  const handleTabChange = (tab) => {
    setactiveTab(tab);
  };

  const deleteData = (index, category, amount) => {
    const convertedAmount = Number(amount);
    setData(data.filter((_, i) => i !== index))
    if(category === "income") {
      setTotalMoney(prev => prev - convertedAmount);
      setTotalIncome(prev => prev - convertedAmount)
    } else if(category === "expense") {
      setTotalMoney(prev => prev + convertedAmount)
      setTotalExpense(prev => prev - convertedAmount)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-8 justify-center items-center mt-10 w-full">
        <div className="flex flex-row gap-8 items-center justify-between w-full max-xl:gap-6 max-lg:flex-col">
          <div className="flex flex-col gap-2 items-center justify-items-start border-2 border-white bg-white p-14 rounded-2xl max-xl:p-12 max-lg:px-18">
            <p className="text-3xl font-semibold text-black max-xl:text-2xl max-lg:text-xl max-xs:text-lg max-sm:w-24 max-sm:text-base">Total Balance</p>
            <h3 className="text-2xl font-semibold text-gray-700 max-xl:text-xl max-lg:text-lg max-sm:text-base">
              ${totalMoney}
            </h3>
          </div>
          <div className="flex flex-col gap-2 items-center justify-items-start border-2 border-green-600 bg-green-600 p-14 rounded-2xl text-white max-xl:p-12 max-lg:px-14">
            <p className="text-3xl font-semibold max-xl:text-2xl max-lg:text-xl max-sm:w-30 max-sm:text-base">Monthly Income</p>
            <h3 className="text-2xl font-semibold max-xl:text-xl max-lg:text-lg max-sm:text-base">${totalIncome}</h3>
          </div>
          <div className="flex flex-col gap-2 items-center justify-items-start border-2 border-red-600 bg-red-600 p-14 rounded-2xl text-white max-xl:p-12 max-lg:px-12">
            <p className="text-3xl font-semibold max-xl:text-2xl max-lg:text-xl max-xs:text-lg max-sm:w-32 max-sm:text-base">Monthly Expense</p>
            <h3 className="text-2xl font-semibold max-xl:text-xl max-lg:text-lg max-sm:text-base">${totalExpense}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-12 border-2 border-white bg-white p-8 w-full rounded-2xl">
          <div className="flex flex-row gap-4 items-center justify-start">
            <i className="fa-solid fa-circle-plus fa-xl"></i>
            <h3 className="text-3xl font-semibold text-purple-700 max-xl:text-2xl max-md:text-xl max-sm:text-lg">
              Add Transaction
            </h3>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-row gap-1 items-center text-center justify-center bg-gray-300 p-2 rounded-2xl w-full max-sm:flex-col">
              {tabs.map((tab) => {
                return (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`px-6 p-4 ${
                        activeTab === tab.id
                          ? `${
                              activeTab === "income"
                                ? "bg-white text-green-600"
                                : "bg-white text-red-600"
                            }`
                          : "text-black bg-gray-300"
                      } rounded-xl cursor-pointer text-xl max-lg:text-lg max-md:text-base w-full max-sm:text-xs`}
                    >
                      {tab.label}
                    </button>
                );
              })}
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-5"
            >
              <div className="w-full flex flex-col gap-2">
                <label className="text-xl text-gray-400 font-bold max-lg:text-lg max-md:text-base max-sm:text-xs">
                  AMOUNT
                </label>
                <input
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 p-5 rounded-xl bg-gray-300 text-white"
                  placeholder="Enter your amount"
                  type="number"
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="text-xl text-gray-400 font-bold max-lg:text-lg max-md:text-base max-sm:text-xs">
                  CATEGORY
                </label>
                <Category
                  activeTab={activeTab}
                  form={form}
                  handleChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="text-xl text-gray-400 font-bold max-lg:text-lg max-md:text-base max-sm:text-xs">NOTES</label>
                <input
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-400 p-5 rounded-xl bg-gray-300 text-white"
                  placeholder="What was this for?"
                  type="text"
                  required
                />
              </div>
              <button
                type="submit"
                className="border-2 border-purple-600 bg-purple-600 text-white w-full p-4 mt-4 rounded-xl text-xl font-bold cursor-pointer max-lg:text-lg max-md:text-base max-sm:text-xs"
              >
                add Transaction
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-8 border-2 border-white bg-white p-8 w-full rounded-2xl mb-12 max-sm:p-5">
          <div className="flex flex-row items-center justify-between p-2 max-sm:p-0">
            <h1 className="text-3xl text-purple-600 font-semibold max-xl:text-2xl max-md:text-xl max-sm:text-lg">
              Recent Transaction
            </h1>
            {data != "" &&
            <div>
              <button
                className="text-blue-700 font-semibold underline cursor-pointer hover:text-purple-800 text-lg max-md:text-base max-sm:text-xs"
                onClick={toHistory}
              >
                Show all
              </button>
            </div>
          }
          </div>
          {data == "" && <p>No Transaction to show</p>}
          {data.map((value, index) => {
            return index < 4 ? (
              <div
                key={index}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-row gap-3 max-sm:gap-2">
                  <div
                    className={`${
                      value.type === "expense"
                        ? "border-red-600 bg-red-600"
                        : "bg-green-600 border-2 border-green-600"
                    } border-2 p-4 rounded-2xl max-md:px-3 max-md:py-3 max-md:rounded-xl max-sm:py-2 max-sm:px-2`}
                  >
                    {value.type === "expense"? <CircleArrowDown className="text-white max-md:w-7 max-sm:w-5" size={30}/>:<CircleArrowDown className="text-white max-md:w-7 max-sm:w-5" size={30}/>}
                  </div>
                  <div className="flex flex-col gap-3 items-start justify-center max-sm:gap-2">
                    <h3 className="text-lg font-bold text-black max-md:text-base max-sm:text-xs">
                      {value.category}
                    </h3>
                    <p className="text-base font-semibold text-black max-sm:text-[10px]">
                      {value.notes}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center max-md:gap-3 max-sm:gap-2">
                  <h2 className="font-bold text-xl text-black max-md:text-base max-sm:text-xs">
                    {value.type === "expense" ? "-" : "+"}${value.amount}
                  </h2>
                  <button onClick={() => deleteData(index, value.type, value.amount)} className=" border-red-600 p-3 m-2 bg-red-600 rounded-xl cursor-pointer max-md:p-2 max-sm:p-1"><Trash2 className="text-white max-md:w-5" size={24}/></button>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

function Category({ activeTab, form, handleChange }) {
  const incomeCategory = [
    "Choose",
    "Salary",
    "Freelance",
    "Investment",
    "Gift",
    "Others",
  ];
  const expenseCategory = [
    "Choose",
    "Rent",
    "Food",
    "Transport",
    "Utilites",
    "Health",
    "Shopping",
    "Others",
  ];

  return (
    <>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full border-2 border-gray-400 p-5 rounded-xl bg-gray-300 text-white"
      >
        {activeTab === "income"
          ? incomeCategory.map((value) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })
          : expenseCategory.map((value) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
      </select>
    </>
  );
}

export default Dashboard;
