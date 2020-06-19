import React from 'react';
import Spinner from './Spinner';
import './Status.css';

let output = [];

export default function Status({status}) {
  const addToOutput = ({text, key, className}) => {
    const repeatedElementIndex = output.findIndex(elem => elem.key === key);
    if (repeatedElementIndex >= 0) {
      output.splice(repeatedElementIndex, 1);
    }
    output.unshift(
      <div key={key} className={className}>
        {text}
      </div>
    );
  };
  if (status) {
    if (status.errors) {
      const errorMsgs = status.errors.join(', ');
      addToOutput({text: errorMsgs, key: "status__error"+errorMsgs, className:"status__error"});
    }
    if (status.done) {
      addToOutput({text: status.done, key: "status__ok"+status.done, className:"status__ok"});
    }
    if (status.name && status.name === "Error" && status.message) {
      addToOutput({text: status.message, key: "status__error"+status.message, className:"status__error"});
    }
    else if (status.message) {
      addToOutput({text: status.message, key: "status__message"+status.message, className:"status__message"});
    }
  }
  if (output.length > 3) {
    output = output.slice(0 , 3);
  }
  return (
    <div className="status">
      {output.map(elem => elem)}
      {status && status.requesting && <div className="status__requesting">
        <Spinner />
      </div>}
    </div>
  );
}