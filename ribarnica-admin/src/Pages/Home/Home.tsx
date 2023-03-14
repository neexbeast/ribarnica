const Home = () => {
  return (
    <div>
      <form className="flex flex-col">
        <label>Riba</label>
        <select>
          <option>Saran</option>
          <option>Pastrmka</option>
          <option>Oslic</option>
        </select>
        <label>ciscenje</label>
        <input type="checkbox" />
        <label>pecenje</label>
        <input type="checkbox" />
        <span>placeholder DATEPICKERA</span>
      </form>
    </div>
  );
};

export default Home;
