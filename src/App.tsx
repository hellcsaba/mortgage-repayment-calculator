import "./App.css";

function App() {
  return (
    <main className="mortgage">
      <form className="mortgage__form">
        <div className="mortgage__header">
          <h1 className="mortgage__title">Mortgage Calculator</h1>
          <button className="mortgage__reset-button" type="reset">
            Clear All
          </button>
        </div>

        <label className="mortgage__label">Mortgage Amount</label>
        <input className="mortgage__input" type="number" />
        <label className="mortgage__label">Mortgage Term</label>
        <input className="mortgage__input" type="number" />
        <label className="mortgage__label">Interest Rate</label>
        <input className="mortgage__input" type="number" />

        <fieldset className="mortgage__type">
          <legend className="mortgage__label">Mortgage Type</legend>

          <label className="mortgage__radio-label">Repayment</label>
          <input className="mortgage__radio" type="radio" id="repayment" name="mortgage-type" value="repayment" />

          <label className="mortgage__radio-label">Interest only</label>
          <input className="mortgage__radio" type="radio" id="interest" name="mortgage-type" value="interest" />
        </fieldset>

        <button className="mortgage__submit-button" type="submit">
          Calculate Repayments
        </button>
      </form>
      <section className="mortgage__results">
        <img
          className="mortgage__results-image"
          src="/assets/illustration-empty.svg"
          alt="Empty results illustration"
        ></img>
        <p className="mortgage__results-text">Results shown here</p>
        <p className="mortgage__results-descrition">
          Complete the form and click “calculate repayments” to see what your monthly repayments would be.
        </p>
      </section>
    </main>
  );
}

export default App;
