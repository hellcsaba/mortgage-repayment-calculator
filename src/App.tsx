import "./App.scss";

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

        <div className="mortgage__input-group">
          <label className="mortgage__label" htmlFor="amount">
            Mortgage Amount
          </label>
          <div className="mortgage__input-wrapper">
            <span className="mortgage__icon mortgage__icon--left">£</span>
            <input className="mortgage__input" type="number" id="amount" />
          </div>
        </div>

        <div className="mortgage__row">
          <div className="mortgage__input-group">
            <label className="mortgage__label" htmlFor="term">
              Mortgage Term
            </label>
            <div className="mortgage__input-wrapper">
              <input className="mortgage__input" type="number" id="term" />
              <span className="mortgage__icon mortgage__icon--right">years</span>
            </div>
          </div>

          <div className="mortgage__input-group">
            <label className="mortgage__label" htmlFor="interest-rate">
              Interest Rate
            </label>
            <div className="mortgage__input-wrapper">
              <input className="mortgage__input" type="number" id="interest-rate"></input>
              <span className="mortgage__icon mortgage__icon--right">%</span>
            </div>
          </div>
        </div>

        <fieldset className="mortgage__type">
          <legend className="mortgage__label">Mortgage Type</legend>

          <label className="mortgage__radio-label">
            <input className="mortgage__radio" type="radio" name="mortgage-type" value="repayment" />
            Repayment
          </label>

          <label className="mortgage__radio-label">
            <input className="mortgage__radio" type="radio" name="mortgage-type" value="interest" />
            Interest Only
          </label>
        </fieldset>

        <button className="mortgage__submit-button" type="submit">
          <img src="/assets/icon-calculator.svg" alt="Calculator icon"></img>
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
        <p className="mortgage__results-description">
          Complete the form and click “calculate repayments” to see what your monthly repayments would be.
        </p>
      </section>
    </main>
  );
}

export default App;
