import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <button className="outline" onClick={() => navigate("/naruci")}>
        Naruci
      </button>
      <button className="outline" onClick={() => navigate("/narudzbe")}>
        Narudzbe
      </button>
    </div>
  );
};

export default Home;
