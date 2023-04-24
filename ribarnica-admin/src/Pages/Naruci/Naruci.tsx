import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  /**
   * the way it is currently implemented, we are updating the state on every key pressed
   * this has to be changed to get all the states on submit
   */
  const [proizvod, setProizvod] = useState("");
  const [kolicina, setKolicina] = useState(1);
  const [ciscenje, setCiscenje] = useState(false);
  const [pecenje, setPecenje] = useState(false);
  const [imePrezime, setImePrezime] = useState("");
  const [cijena, setCijena] = useState("");
  const [sveCijene, setSveCijene] = useState([]);
  const [datum, setDatum] = useState(new Date());
  const [vrijeme, setVrijeme] = useState("9:30");
  const [isporuceno, setIsporuceno] = useState(false);
  const [spremljeno, setSpremljeno] = useState(false);
  const [otkazano, setOtkazano] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    calculatePrice();
  }, [proizvod, kolicina, ciscenje, pecenje]);

  // useEffect(() => {
  //   console.log("datum", datum);
  // }, [datum]);

  //TODO: Dodati date picker i upisati ga u bazu

  const getPrices = async () => {
    console.log("aloalo");
    const res = await fetch("http://localhost:5513/api/cijene", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setSveCijene(data);
    console.log("cijene", data);

    return data;
  };

  const naruci = async (e: any) => {
    e.preventDefault();
    const brojNarudzbe = Math.floor(Math.random() * 10000);
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
        cijena,
        brojNarudzbe,
        imePrezime,
        datum,
        vrijeme,
        isporuceno,
        spremljeno,
        otkazano,
      }),
    });

    const data = await response.json();
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
    setCijena(totalPrice.toFixed(2));
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
                  value={kolicina}
                  step=".01"
                  name="kolicina"
                  onChange={(e: any) => setKolicina(e.target.value)}
                  id="kolicina"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Ime i prezime
                </label>
                <input
                  type="text"
                  // step enables decimal places
                  value={imePrezime}
                  name="kolicina"
                  onChange={(e: any) => setImePrezime(e.target.value)}
                  id="kolicina"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex max-w-sm">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Datum
                  </label>
                  <DatePicker
                    // value={datum}
                    onChange={(date,e:any) => {setDatum(date!)
                    console.log(e)
                    }}
                    selected={datum}
                    showTimeSelect
                    // since html prints the selected date as yyyy-mm-dd, i used split to break down the date and then pyyyrint them out as I like
                    minDate={new Date()}
                    dateFormat='dd/MM/yyyy'
                    // onChange={(e:any) => {
                    //   const datum = e.target.value.split("-");
                    //   const noviDatum =
                    //     datum[2] + "/" + datum[1] + "/" + datum[0];
                    //   setDatum(noviDatum);
                      // return datum;
                    // }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // placeholder="Select date"
                  />
                </div>
                <div>
                  <label className="block mb-2 ml-20 text-sm font-medium text-gray-900 dark:text-white">
                    Vrijeme
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 ml-20 w-40 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                    value={vrijeme}
                    onChange={(e) => setVrijeme(e.target.value)}
                  >
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                  </select>
                </div>
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
              <div className="text-slate-600 text-sm dark:text-white ">Cijena = {cijena} KM</div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  bg-slate-600 font-medium  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Naruci
              </button>
              <button
                onClick={() => navigate("/narudzbe")}
                className="w-full text-white bg-purple-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Provjeri narudzbe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
