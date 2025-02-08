import { useState } from "react";
import "./App.scss";

function App() {
  const [amount, setAmount] = useState<number | "">("");
  const [term, setTerm] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [mortgageType, setMortgageType] = useState<string>("");

  const [errors, setErrors] = useState<{
    amount?: string;
    term?: string;
    interestRate?: string;
    mortgageType?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: typeof errors = {};

    if (!amount) validationErrors.amount = "Mortgage amount is required";
    if (!term) validationErrors.term = "Mortgage term is required";
    if (!interestRate) validationErrors.interestRate = "Interest rate is required";
    if (!mortgageType) validationErrors.mortgageType = "Mortgage type is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <main className="mortgage">
      <form className="mortgage__form" onSubmit={handleSubmit}>
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
          <div className={`mortgage__input-wrapper ${errors.amount ? "mortgage__input-wrapper--error" : ""}`}>
            <span className={`mortgage__icon mortgage__icon--left ${errors.amount ? "mortgage__icon--error" : ""}`}>
              £
            </span>
            <input
              className="mortgage__input"
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
          {errors.amount && <p className="mortgage__error-message">{errors.amount}</p>}
        </div>

        <div className="mortgage__row">
          <div className="mortgage__input-group">
            <label className="mortgage__label" htmlFor="term">
              Mortgage Term
            </label>
            <div className={`mortgage__input-wrapper ${errors.term ? "mortgage__input-wrapper--error" : ""}`}>
              <input
                className="mortgage__input"
                type="number"
                id="term"
                value={term}
                onChange={(e) => setTerm(e.target.value === "" ? "" : Number(e.target.value))}
              />
              <span className={`mortgage__icon mortgage__icon--right ${errors.amount ? "mortgage__icon--error" : ""}`}>
                years
              </span>
            </div>
            {errors.term && <p className="mortgage__error-message">{errors.term}</p>}
          </div>

          <div className="mortgage__input-group">
            <label className="mortgage__label" htmlFor="interest-rate">
              Interest Rate
            </label>
            <div className={`mortgage__input-wrapper ${errors.interestRate ? "mortgage__input-wrapper--error" : ""}`}>
              <input
                className="mortgage__input"
                type="number"
                id="interest-rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value === "" ? "" : Number(e.target.value))}
              ></input>
              <span className={`mortgage__icon mortgage__icon--right ${errors.amount ? "mortgage__icon--error" : ""}`}>
                %
              </span>
            </div>
            {errors.interestRate && <p className="mortgage__error-message">{errors.interestRate}</p>}
          </div>
        </div>

        <fieldset className="mortgage__type">
          <legend className="mortgage__label">Mortgage Type</legend>

          <label className="mortgage__radio-label">
            <input
              className="mortgage__radio"
              type="radio"
              name="mortgage-type"
              value="repayment"
              checked={mortgageType === "repayment"}
              onChange={(e) => setMortgageType(e.target.value)}
            />
            Repayment
          </label>

          <label className="mortgage__radio-label">
            <input
              className="mortgage__radio"
              type="radio"
              name="mortgage-type"
              value="interest"
              checked={mortgageType === "interest"}
              onChange={(e) => setMortgageType(e.target.value)}
            />
            Interest Only
          </label>
          {errors.mortgageType && <p className="mortgage__error-message">{errors.mortgageType}</p>}
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
