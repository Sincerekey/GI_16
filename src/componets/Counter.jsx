import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, showText: state.showText, showText2: !state.showText2 };
    case "DECREMENT":
      return { count: state.count - 1, showText: !state.showText, showText2: state.showText2 };
    default:
      return state;
  }
};

const ReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: false, showText2: false });

  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "DECREMENT" });
        }}
      >
        Decrease
      </button>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
        }}
      >
        Increase
      </button>

      {state.showText && <p>DECREMENT</p>}
      {state.showText2 && <p>INCREMENT</p>}
    </div>
  );
};

export default ReducerExample;
