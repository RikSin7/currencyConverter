import { useEffect, useState } from "react";
import useCurrencyInfo from "../hooks/useCurrencyInfo";
import "remixicon/fonts/remixicon.css";

function Converter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const { rates, loading, error } = useCurrencyInfo(from);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("dark") === "true"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark", "false");
    }
  }, [isDark]);

  // Filtered currencies based on searchFrom input
  const filteredFrom =
    searchFrom.length > 0
      ? Object.keys(rates).filter((curr) =>
          curr.toLowerCase().includes(searchFrom.toLowerCase())
        )
      : Object.keys(rates);
      
  // Filtered currencies based on searchTo input
  const filteredTo =
    searchTo.length > 0
      ? Object.keys(rates).filter((curr) =>
          curr.toLowerCase().includes(searchTo.toLowerCase())
        )
      : Object.keys(rates);

  const swapCurr = () => {
    setFrom(() => to);
    setTo(() => from);
    if (searchFrom.length > 0) {
      setSearchFrom(() => to);
      setSearchTo(() => from);
    }
  };

  const convertedAmount = (amount) => {
    if (!rates[to]) return 0;
    return (amount * rates[to]).toFixed(2);
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center relative  bg-lightbg dark:bg-darkbg">
      <div className="w-[95%] max-w-lg shadow-lg flex flex-col items-center min-w-[330px] mx-auto rounded-lg bg-lightContainer  dark:bg-darkContainer relative">
        <h1 className="lg:text-3xl md:text-[1.5rem] font-semibold text-2xl px-8 mt-8  text-darkText dark:text-lightText">
          Currency Converter
        </h1>
        <button
          className="absolute top-5 right-5 text-[#363636]"
          onClick={() => setIsDark(!isDark)}
        >
          <span className="relative">
            <i
              className={`ri-moon-fill ${
                isDark ? "hidden" : "block"
              } hover:-rotate-[15deg] text-xl transition-transform duration-300`}
            ></i>
            <i
              className={`ri-sun-fill ${
                isDark ? "block" : "hidden"
              } text-white  hover:-rotate-[15deg] text-xl transition-transform duration-300`}
            ></i>
          </span>
        </button>
        {loading && (
          <p className="text-[#363636] text-center my-12">Loading Rates...</p>
        )}
        {error && (
          <p className="text-[#363636] text-center my-12">An Error occurred!</p>
        )}
        {!loading && !error && (
          <>
            <div className="input flex mt-8 justify-between relative">
              <div className="fromInput flex flex-col relative">
                <div className="flex items-center space-x-2">
                  <h1 className="sm:text-xl mb-1 dark:text-[#fff]">From</h1>
                  <input
                    type="text"
                    value={searchFrom}
                    onChange={(e) => {
                      setSearchFrom(e.target.value);

                      // Automatically select the first match if available
                      const filtered = Object.keys(rates).filter((curr) =>
                        curr
                          .toLowerCase()
                          .includes(
                            e.target.value.length > 1 &&
                              e.target.value.toLowerCase()
                          )
                      );
                      if (filtered.length > 0) {
                        setFrom(filtered[0]);
                      }
                    }}
                    placeholder="Search"
                    className="outline-none w-20 bg-[#f2f2f2] py-1 text-center rounded-full shadow-lg placeholder:text-[#686868] dark:bg-[#353535] dark:placeholder:text-[#e4e4e4] dark:text-white"
                  />
                </div>
                <div className="flex gap-1 bg-slate-200 dark:bg-[#353745] px-2 justify-center py-1 mt-2 sm:mt-4 relative max-w-[115px] shadow-lg rounded-lg">
                  <img
                    src={`https://flagsapi.com/${from.slice(0, 2)}/flat/64.png`}
                    className="w-8"
                    alt={`Flag of ${from}`}
                  />
                  <select
                    className="my-2 appearance-auto bg-[#fff] dark:bg-[#282828] dark:text-white rounded-lg w-16 cursor-pointer"
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value);
                    }}
                  >
                    {searchFrom.length > 0
                      ? filteredFrom.map((currency) => (
                          <option value={currency} key={currency}>
                            {currency}
                          </option>
                        ))
                      : Object.keys(rates).map((currency) => (
                          <option value={currency} key={currency}>
                            {currency}
                          </option>
                        ))}
                  </select>
                  {filteredFrom.length === 0 && (
                    <h1 className="absolute w-full text-nowrap top-10 dark:text-white mt-4 sm:mt-2">
                      No Currency Found
                    </h1>
                  )}
                </div>
              </div>
              <span
                className="cursor-pointer h-12 mt-6 mx-12 text-3xl shadow-lg bg-[#f2f2f2] dark:bg-[#1b1b20] px-2 sm:px-4 rounded-lg text-center flex justify-center items-center dark:text-white"
                onClick={swapCurr}
              >
                ⇄
              </span>
              <div className="toInput flex flex-col">
                <div className="flex  items-center space-x-2">
                  <h1 className="sm:text-xl mb-1  dark:text-[#fff]">To</h1>
                  <input
                    type="text"
                    value={searchTo}
                    onChange={(e) => {
                      setSearchTo(e.target.value);

                      // Automatically select the first match if available
                      const filtered = Object.keys(rates).filter((curr) =>
                        curr
                          .toLowerCase()
                          .includes(
                            e.target.value.length > 1 &&
                              e.target.value.toLowerCase()
                          )
                      );
                      if (filtered.length > 0) {
                        setTo(filtered[0]);
                      }
                    }}
                    placeholder="Search"
                    className="outline-none w-20 bg-[#f2f2f2] py-1 text-center rounded-full shadow-lg placeholder:text-[#686868] dark:bg-[#353535] dark:placeholder:text-[#e4e4e4] dark:text-white"
                  />
                </div>
                <div className="flex gap-1 bg-slate-200 dark:bg-[#353745]  px-2 justify-center py-1 mt-2 sm:mt-4 relative max-w-[115px] shadow-lg rounded-lg">
                  <img
                    src={`https://flagsapi.com/${to.slice(0, 2)}/flat/64.png`}
                    className="w-8"
                    alt={`Flag of ${to}`}
                  />
                  <select
                    className="my-2 appearance-auto bg-[#fff]  dark:bg-[#282828] dark:text-white rounded-lg w-16 cursor-pointer"
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                    }}
                  >
                    {searchTo.length > 0
                      ? filteredTo.map((currency) => (
                          <option value={currency} key={currency}>
                            {currency}
                          </option>
                        ))
                      : Object.keys(rates).map((currency) => (
                          <option value={currency} key={currency}>
                            {currency}
                          </option>
                        ))}
                  </select>
                  {filteredTo.length === 0 && (
                    <h1 className="absolute w-full text-nowrap top-10 dark:text-white mt-4 sm:mt-2">
                      No Currency Found
                    </h1>
                  )}
                </div>
              </div>
            </div>
            <div className="amount w-full flex justify-center mt-12">
              <input
                type="number"
                placeholder="Enter Amount"
                className="text-center  py-5 sm:py-8 bg-[#efefef] text-[#000000] placeholder:text-[#bcbcbc] sm:text-2xl w-48 shadow-md font-semibold flex-grow rounded-lg text-xl dark:bg-[#1A1A1A] dark:text-white dark:placeholder:text-[#808080] outline-none"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                min={1}
                step={1}
              />
            </div>
            <div className="convertedAmount mb-12 mt-4 bg-[#1a1a1a] w-full sm:py-8 py-5  shadow-lg  text-center rounded-lg">
              <span className="sm:text-xl text-base font-semibold text-[#808080] ">
                Converted Amount :{" "}
                <strong className="text-[#f84d4d] font-semibold">
                  {convertedAmount(amount)}
                </strong>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Converter;
