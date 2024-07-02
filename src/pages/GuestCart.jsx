import React from "react";
import { useOcrApi } from "../hooks/useOcrApi";

function GuestCart() {
  const { data, getPrice } = useOcrApi(); // Remove the unused 'data' variable

  const handleClick = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      await getPrice(file);
    }
  };
  return (
    <div>
      <div className="theme.container">
        <button
          type="button"
          className="font-display text-gray-900 bg-gray-800 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 btn-width"
        >
          <b>Set Budget</b>
        </button>
        <div>current budget amount</div>
        <input type="file" name="newItem" onChange={handleClick}></input>
      </div>
      {data && (
        <div>
          <h3> Result: </h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GuestCart;
