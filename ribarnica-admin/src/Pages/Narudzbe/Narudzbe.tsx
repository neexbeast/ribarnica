import { useEffect, useState } from "react";

const Narudzbe = () => {
  const [sveNarudzbe, setSveNarudzbe] = useState([]);
  const [isporuceno, setIsporuceno] = useState(-1);
  const [spremljeno, setSpremljeno] = useState(-1);
  const [otkazano, setOtkazano] = useState(-1);
  // const [indeks, setIndeks] = useState(-1);
  // const [testBaza, setTestBaza] = useState('');

  // const handleClick = () => {
  //   setIsporuceno(!isporuceno);
  // };

  const isporuciApi = async (brojNarudzbe: any, action: any) => {
    if (action == "isporuci") {
      const response = await fetch("http://localhost:5513/api/isporuci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brojNarudzbe,
        }),
      });
      const data = await response.json();
      return data;
    } else if (action == "spremi") {
      const response = await fetch("http://localhost:5513/api/spremljeno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brojNarudzbe,
        }),
      });
      const data = await response.json();
      return data;
    }

    // console.log("ata", data);
    // return data;
  };

  const deleteApi = async (brojNarudzbe: any) => {
    const response = await fetch("http://localhost:5513/api/izbrisi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brojNarudzbe,
      }),
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const getNarudzbe = async () => {
      const res = await fetch("http://localhost:5513/api/svenarudzbe", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setSveNarudzbe(data);

      return data;
    };
    getNarudzbe();
  }, []);

  const filterFunction = async (action: any) => {
    console.log("akcija,", action);
    if (action === "isporucene") {
      const res = await fetch("http://localhost:5513/api/isporucene", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("data", data);
      setSveNarudzbe(data);

      return data;
    } else if (action === "sve") {
      const res = await fetch("http://localhost:5513/api/svenarudzbe", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("data", data);
      setSveNarudzbe(data);
    } else if (action === "spremljeno") {
      const res = await fetch("http://localhost:5513/api/spremljene", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("data", data);
      setSveNarudzbe(data);
    } else if (action === "pending") {
      const res = await fetch("http://localhost:5513/api/pending", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("data", data);
      setSveNarudzbe(data);
    }
  };

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
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <select onChange={(e) => filterFunction(e.target.value)}>
        <option value="sve" selected>
          Sve
        </option>
        <option value="pending">Za spremiti</option>
        <option value="isporucene">Isporuceno</option>
        <option value="spremljeno">Spremljeno</option>
      </select>
      <div className="flex flex-wrap pt-10 h-screen bg-gray-50 dark:bg-gray-900">
        {sveNarudzbe.map((el, index) => (
          <div key={el.brojNarudzbe} className="ml-20 mb-10">
            <div
              className={
                isporuceno === index || el.isporuceno === true
                  ? "bg-green-500 max-w-sm p-6 h-64 w-72 border border-gray-200 rounded-lg shadow hover:bg-green-400"
                  : spremljeno === index || el.spremljeno === true
                  ? "bg-blue-500 max-w-sm p-6 h-64 w-72 border border-gray-200 rounded-lg shadow hover:bg-blue-400"
                  : "max-w-sm p-6 h-64 w-72 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              }
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
              <h3 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                {el.datum} {el.vrijeme}
              </h3>
            </div>
            <div className="minus-margin">
              <h3 className="mb-2 mr-3 text-2xl flex justify-end font-bold tracking-tight  text-gray-900 dark:text-white">
                Cijena: {el.cijena} KM
              </h3>
              <button
                className="bg-green-500 w-24 rounded-l"
                onClick={() => {
                  setIsporuceno(index);
                  isporuciApi(el.brojNarudzbe, "isporuci");
                  // setIsporuceno(!isporuceno);
                }}
              >
                Isporuceno
              </button>
              <button
                className="bg-blue-500  w-24"
                onClick={() => {
                  setSpremljeno(index);
                  isporuciApi(el.brojNarudzbe, "spremi");
                }}
              >
                Spremljeno
              </button>
              <button className="bg-red-500 w-24 rounded-r"
              onClick={() => deleteApi(el.brojNarudzbe)}
              >Otkazano</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Narudzbe;
