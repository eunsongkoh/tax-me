export default function AddItem() {
  return (
    <>
      <div className="addItem">
        <h2>Successful Photo Scan</h2>
        <h3>Price: </h3>

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
            <option selected>Select Item Type</option>
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
              type="text"
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
              Last name
            </label>
            <input
              type="text"
              id="objName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cheese"
              required
            />
          </div>
        </form>
      </div>
    </>
  );
}
