import PropTypes from "prop-types";
import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <>
      <li key={transaction.id} className={sign === "+" ? "plus" : "minus"}>
        {transaction.text}
        <span>
          {sign}${Math.abs(transaction.amount)}
        </span>
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="delete-btn"
        >
          x
        </button>
      </li>
    </>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default Transaction;
