export default function AddItem() {
  return (
    <>
      <div className="border-solid border-2">
        <h2>Successful Photo Scan</h2>
        <h3>Price: {}</h3>

        <form className="max-w-sm mx-auto">
          <label
            htmlFor="itemType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Item Type
          </label>
          <select
            id="itemType"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue="Produce">Select Item Type</option>
            <option value="1">Produce</option>
            <option value="2">Alcoholic Beverages</option>
            <option value="3">Carbonated drinks, candies, snack foods</option>
            <option value="4">Prepared Foods</option>
          </select>

          <div>
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="3"
              required
            />
          </div>

          <div>
            <label
              htmlFor="objName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Item Name
            </label>
            <input
              type="text"
              id="objName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cheese"
              required
            />
          </div>

          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
