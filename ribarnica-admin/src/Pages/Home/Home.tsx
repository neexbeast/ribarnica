import { useEffect, useState } from "react";

const Home = () => {
  /**
   * the way it is currently implemented, we are updating the state on every key pressed
   * this has to be changed to get all the states on submit
   */
  const [proizvod, setProizvod] = useState("");
  const [kolicina, setKolicina] = useState(0);
  const [ciscenje, setCiscenje] = useState(false);
  const [pecenje, setPecenje] = useState(false);

  //TODO: Dodati date picker i upisati ga u bazu

  const naruci = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5513/api/naruci", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proizvod,
        kolicina,
        ciscenje,
        pecenje,
      }),
    });

    const data = await response.json();

    console.log("data", data);
  };

  // Temporary hard coded prices for each product
  const prices: Record<string, number> = {
    Saran: 15,
    Pastrmka: 8,
    Oslic: 13,
    Tolstolobik: 10,
  };

  // Calculating total price by type of product and amount BRAVO FARISE
  const calculatePrice = () => {
    let totalPrice: number = 0;
    if (proizvod && kolicina) {
      totalPrice = prices[proizvod] * kolicina;
    }
    if (ciscenje) {
      totalPrice += kolicina * 1;
    }
    if (pecenje) {
      totalPrice += kolicina * 1.5;
    }
    return totalPrice.toFixed(2);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Ribarnica Zeljko
        </span>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Narucivanje
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={naruci}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Proizvod
                </label>
                <select
                  id="countries_disabled"
                  value={proizvod}
                  onChange={(e) => setProizvod(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Izaberite proizvod</option>
                  <option value="Saran">Saran</option>
                  <option value="Pastrmka">Pastrmka</option>
                  <option value="Oslic">Oslic</option>
                  <option value="Tolstolobik">Tolstolobik</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Kolicina
                </label>
                <input
                  type="number"
                  // step enables decimal places
                  step=".01"
                  name="kolicina"
                  onChange={(e: any) => setKolicina(e.target.value)}
                  id="kolicina"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <div className=" text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Ciscenje
                    </label>
                  </div>
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    onChange={() => setCiscenje(!ciscenje)}
                    className="ml-3 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <div className=" text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Pecenje
                    </label>
                  </div>
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    onChange={() => setPecenje(!pecenje)}
                    className="ml-3 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
              </div>
              <div className="text-white text-sm">
                Cijena = {calculatePrice()} KM
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Naruci
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
