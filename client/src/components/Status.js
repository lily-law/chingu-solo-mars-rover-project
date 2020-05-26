import React from 'react';

export default function Status({status, photoData}) {
  if(status && status.code && status.code >= 300) {
    return (
      <div>
        {status.message}
      </div>
    );
  }
  return null
}