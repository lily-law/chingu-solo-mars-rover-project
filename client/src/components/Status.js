import React from 'react';
import Spinner from './Spinner';
import './Status.css';

let output = [];

export default function Status({status}) {
  if (status) {
    if (status.errors) {
      const errorMsgs = status.errors.join(', ');
      output = [<div key={"status__error"+errorMsgs} className="status__error">
          {errorMsgs}
      </div>]
    }
    if (status.done) {
      const key = "status__ok"+status.done;
      if (!output.some(elem => elem.key === key)) {
        output.unshift(
          <div key={key} className="status__ok">
            {status.done}
          </div>
        );
      }
    }
    if (status.name && status.name === "Error" && status.message) {
      output = [<div key={"status__error"+status.message} className="status__error">
          {status.message}
      </div>]
    }
    else if (status.message) {
      const key = "status__message"+status.message;
      if (!output.some(elem => elem.key === key)) {
        output.unshift(
          <div key={key} className="status__message">
            {status.message}
          </div>
        );
      }
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