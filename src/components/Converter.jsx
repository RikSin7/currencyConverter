import React, { useState } from "react";
import useCurrencyInfo from "../hooks/useCurrencyInfo";

function Converter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const { rates, loading, error } = useCurrencyInfo(from);

  const swapCurr = () => {
    setFrom(() => to);
    setTo(() => from);
  };

  const convertedAmount = (amount) => {
    if (!rates[to]) return 0;
    return (amount * rates[to]).toFixed(2);
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center relative bg-[#ffffff]">
      <div className="w-[95%] max-w-lg shadow-lg flex flex-col items-center min-w-[330px] mx-auto rounded-lg bg-[#fcfcfc]">
        <h1 className="lg:text-3xl md:text-[1.5rem] font-semibold text-2xl px-8 mt-8">
          Currency Converter
        </h1>
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
                <h1 className="sm:text-xl mb-1">From</h1>
                <div className="flex gap-1 bg-slate-200  px-2 relative max-w-[115px] shadow-lg rounded-lg">
                  <img
                    src={`https://flagsapi.com/${from.slice(0, 2)}/flat/64.png`}
                    className="w-8"
                    alt={`Flag of ${from}`}
                  />
                  <select
                    className="my-2 appearance-auto bg-[#fff] rounded-lg w-16 cursor-pointer"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    {Object.keys(rates).map((currency) => (
                      <option value={currency} key={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <span
                className="cursor-pointer h-12 mt-6 mx-12 text-3xl shadow-lg bg-[#f2f2f2] px-2 sm:px-4 rounded-lg text-center flex justify-center items-center"
                onClick={swapCurr}
              >
                ⇄
              </span>
              <div className="toInput flex flex-col">
                <h1 className="sm:text-xl mb-1">To</h1>
                <div className="flex gap-1 bg-slate-200  px-2 relative max-w-[115px] shadow-lg rounded-lg">
                  <img
                    src={`https://flagsapi.com/${to.slice(0, 2)}/flat/64.png`}
                    className="w-8"
                    alt={`Flag of ${to}`}
                  />
                  <select
                    className="my-2 bg-[#fff] rounded-lg appearance-auto w-16 cursor-pointer"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  >
                    {Object.keys(rates).map((currency) => (
                      <option value={currency} key={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="amount w-full flex justify-center mt-12">
              <input
                type="number"
                placeholder="Enter Amount"
                className="text-center  py-5 sm:py-8 bg-[#efefef] text-[#000000] placeholder:text-[#bcbcbc] sm:text-2xl w-48 shadow-md font-semibold flex-grow rounded-lg text-xl outline-[#000000]"
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
