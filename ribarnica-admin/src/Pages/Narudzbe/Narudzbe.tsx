import { useEffect, useState } from "react";

const Narudzbe = () => {
  const [sveNarudzbe, setSveNarudzbe] = useState([]);

  useEffect(() => {
    const getNarudzbe = async () => {
      const res = await fetch("http://localhost:5513/api/svenarudzbe", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("data", data);
      const dataTest = data.map((el: any) => console.log(el.brojNarudzbe));
      setSveNarudzbe(data);

      return data;
    };
    getNarudzbe();
  }, []);

  // const getNarudzbe = async () => {
  //   const res = await fetch("http://localhost:5513/api/svenarudzbe", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await res.json();
  //   console.log("data", data);
  //   const dataTest = data.map((el: any) => console.log(el.brojNarudzbe));
  //   setSveNarudzbe(data);

  //   return data;
  // };
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {sveNarudzbe.map((el) => (
        <div
          key={el.brojNarudzbe}
          className="flex flex-col  h-72 px-6 py-8 mx-auto h-screen"
        >
          <a
            href="#"
            className="pl-25 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {el.imePrezime} {el.brojNarudzbe}
            </h3>
            <h3 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
              {el.proizvod} {el.kolicina} KG
            </h3>
            {el.ciscenje && (
              <h3 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                Ciscenje
              </h3>
            )}
            {el.pecenje && (
              <h3 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                Pecenje
              </h3>
            )}
            <h3 className="mb-2 text-2xl flex justify-end font-bold tracking-tight text-gray-900 dark:text-white">
              Cijena: {el.cijena} KM
            </h3>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Narudzbe;
