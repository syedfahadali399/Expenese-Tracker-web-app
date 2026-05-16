import { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";

function History() {
  const { data } = useContext(DataContext);
  const category = [
    "All",
    "Salary",
    "Freelance",
    "Investment",
    "Gift",
    "Rent",
    "Food",
    "Transport",
    "Utilites",
    "Health",
    "Shopping",
    "Others",
  ];

  const [option, setOption] = useState(category[0]);
  const [query, setQuery] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const [selectLatestOldest, setSelectLatestOldest] = useState("")

  const handleOption = (e) => {
    const value = e.target.value;
    setOption(value);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    console.log(query);
  };

  const handleSelectOption = (e) => {
    let value = e.target.value;
    setSelectOption(value);
  };

  const handleSelectLatestOldest = (e) => {
    let value = e.target.value;
    setSelectLatestOldest(value)
    console.log(value);
    
  }

  const filteredData = data.filter((item) => {

    const matchCategory = option === "All" || item.category === option;
    const matchQuery =
      query === "" ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.notes.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase());

    return matchCategory && matchQuery;
  });

  let finalSort = [...filteredData];

  if (selectOption === "smallest") {
    finalSort.sort((a, b) => Number(a.amount) - Number(b.amount));
  }

  if (selectOption === "largest") {
    finalSort.sort((a, b) => Number(b.amount) - Number(a.amount));
  }

  let finalSelect = [...finalSort]

  if(selectLatestOldest == "oldest") {
    finalSelect.sort()
  }

  if(selectLatestOldest == "latest") {
    finalSelect.reverse()
  }

  return (
    <>
      <div className="flex flex-row gap-3 items-center mb-4 w-full max-xl:grid max-xl:grid-cols-2 max-xl:mb-8">
        <select
          className="border-2 border-black p-3 m-2 rounded-xl text-lg font-semibold bg-white"
          name="category"
          value={option}
          onChange={handleOption}
        >
          {category.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
        <select
          className="border-2 border-black p-3 m-2 rounded-xl text-lg font-semibold bg-white"
          name="category"
          value={selectOption}
          onChange={handleSelectOption}
        >
          <option value={""}>Choose</option>
          <option value={"smallest"}>Smallest by amount</option>
          <option value={"largest"}>Largest by amount</option>
        </select>
        <select
          className="border-2 border-black p-3 m-2 rounded-xl text-lg font-semibold bg-white"
          name="category"
          value={selectLatestOldest}
          onChange={handleSelectLatestOldest}
        >
          <option value={""}>Choose</option>
          <option value={"latest"}>Latest Transaction</option>
          <option value={"oldest"}>Oldest Transaction</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter any Query"
          className="border-2 border-black p-3 m-2 text-black text-lg font-semibold rounded-xl bg-white"
        />
        <button
          onClick={handleInput}
          className="border-2 border-purple-600 p-3 m-2 text-white bg-purple-600 rounded-xl px-6 text-lg font-semibold cursor-pointer"
        >
          Sreach
        </button>
      </div>
      <div className="flex flex-col gap-8 border-2 border-white bg-white p-8 w-full h-full rounded-2xl">
        <div>
          <h1 className="text-3xl text-purple-600 font-semibold">
            Recent Transaction
          </h1>
        </div>
        {finalSelect.length === 0 && <p>No Transaction to show</p>}

        {finalSelect.map((value, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between"
          >
            <div className="flex flex-row gap-3">
              <div
                className={`${
                  value.type === "expense"
                    ? "border-red-600 bg-red-600"
                    : "bg-green-600 border-green-600"
                } border-2 p-4 rounded-2xl`}
              >
                {value.type === "expense"? <CircleArrowDown className="text-white" size={30}/>:<CircleArrowDown className="text-white" size={30}/>}

                
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">{value.category}</h3>
                <p className="text-base font-semibold">{value.notes}</p>
              </div>
            </div>
            <h2 className="font-bold text-xl">
              {value.type === "expense" ? "-" : "+"}${value.amount}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default History;
