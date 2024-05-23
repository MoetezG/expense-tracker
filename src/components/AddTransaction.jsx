import { useContext, useRef } from "react";
import { GlobalContext } from "../Context/GlobalState";
const AddTransaction = () => {
  const textRef = useRef();
  const amountRef = useRef();

  const { addTransaction } = useContext(GlobalContext);
  const onsubmit = (e) => {
    e.preventDefault();
    const text = textRef.current.value;
    const amount = amountRef.current.value;
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };
    console.log(newTransaction);
    addTransaction(newTransaction);
    textRef.current.value = "";
    amountRef.current.value = "";
  };
  return (
    <div>
      <h3>Add new transaction</h3>
      <form onSubmit={onsubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" ref={textRef} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input type="number" ref={amountRef} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
