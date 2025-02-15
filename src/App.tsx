import { useMemo, useState } from "react";
import "./App.scss";

function App() {
  const [amount, setAmount] = useState<number | "">("");
  const [term, setTerm] = useState<number | "">("");
  const [interestRate, setInterestRate] = useState<number | "">("");
  const [mortgageType, setMortgageType] = useState<string>("");
  const [monthlyRepaymentAmount, setMonthlyRepaymentAmount] = useState<string>();
  const [totalRepaymentAmount, setTotalRepaymentAmount] = useState<string>();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      calculateMortgage(Number(amount), Number(term), Number(interestRate), mortgageType);
      setIsSubmitted(true);
    }
  };

  const calculateMortgage = (amount: number, term: number, interestRate: number, mortgageType: string) => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalMonths = term * 12;

    let monthlyRepayment: number;
    let totalRepayOverTerm: number;

    if (mortgageType === "repayment") {
      monthlyRepayment =
        (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

      totalRepayOverTerm = monthlyRepayment * totalMonths;
    } else {
      // interest only calculation
      monthlyRepayment = (amount * interestRate) / 100 / 12;
      totalRepayOverTerm = monthlyRepayment * totalMonths;
    }

    setMonthlyRepaymentAmount(Number(monthlyRepayment).toLocaleString("en-GB", { minimumFractionDigits: 2 }));
    setTotalRepaymentAmount(Number(totalRepayOverTerm).toLocaleString("en-GB", { minimumFractionDigits: 2 }));
  };

  const handleReset = () => {
    setAmount("");
    setTerm("");
    setInterestRate("");
    setMortgageType("");
    setIsSubmitted(false);
    setErrors({});
  };

  const formattedAmount = useMemo(() => {
    return amount !== "" ? Number(amount).toLocaleString("en-GB", { minimumFractionDigits: 0 }) : "";
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas for parsing

    if (value === "" || !isNaN(Number(value))) {
      setAmount(value === "" ? "" : Number(value));
    }
  };

  return (
    <main className="mortgage">
      <form className="mortgage__form" onSubmit={handleSubmit}>
        <div className="mortgage__header">
          <h1 className="mortgage__title">Mortgage Calculator</h1>
          <button className="mortgage__reset-button" type="reset" onClick={handleReset}>
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
              type="text"
              id="amount"
              value={formattedAmount}
              onChange={handleAmountChange}
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
              <span className={`mortgage__icon mortgage__icon--right ${errors.term ? "mortgage__icon--error" : ""}`}>
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
              <span
                className={`mortgage__icon mortgage__icon--right ${errors.interestRate ? "mortgage__icon--error" : ""}`}
              >
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
          <img src={`${import.meta.env.BASE_URL}assets/icon-calculator.svg`} alt="Calculator icon"></img>
          Calculate Repayments
        </button>
      </form>
      {!isSubmitted ? (
        <section className="mortgage__results-empty">
          <img
            className="mortgage__results-image"
            src={`${import.meta.env.BASE_URL}assets/illustration-empty.svg`}
            alt="Empty results illustration"
          ></img>
          <p className="mortgage__results-empty-text">Results shown here</p>
          <p className="mortgage__results-empty-description">
            Complete the form and click “calculate repayments” to see what your monthly repayments would be.
          </p>
        </section>
      ) : (
        <section className="mortgage__results">
          <h2 className="mortgage__results-text">Your results</h2>
          <p className="mortgage__results-description">
            Your results are shown below based on the information you provided. To adjust the results, edit the form and
            click "calculate repayments" again.
          </p>
          <div className="mortgage__results-calculation">
            <div className="mortgage__banner"></div>
            <div className="mortgage__results-monthly-wrapper">
              <p className="mortgage__results-description">Your monthly repayments</p>
              <p className="mortgage__results-monthly-repayment">£{monthlyRepaymentAmount}</p>
            </div>
            <hr className="mortgage__results-break"></hr>
            <div className="mortgage__results-total-wrapper">
              <p className="mortgage__results-description">Total you'll repay over the term</p>
              <p className="mortgage__results-total-repayment">£{totalRepaymentAmount}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
