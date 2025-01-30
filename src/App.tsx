import "./App.css";

function App() {
  return (
    <main>
      <form>
        <div>
          <h1>Mortgage Calculator</h1>
          <button type="reset">Clear All</button>
        </div>
        <label>Mortgage Amount</label>
        <input type="number" />
        <label>Mortgage Term</label>
        <input type="number" />
        <label>Interest Rate</label>
        <input type="number" />
        <p>Mortgage Type</p>
        <label>Repayment</label>
        <input type="radio" name="mortgage-type" value="repayment" />
        <label>Interest only</label>
        <input type="radio" name="mortgage-type" value="interest" />
        <button type="submit">Calculate Repayments</button>
      </form>
      <section>
        <img src="./assets/illustration-empty.svg" alt="Empty results illustration"></img>
        <p>Results shown here</p>
        <p>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
      </section>
    </main>
  );
}

export default App;
