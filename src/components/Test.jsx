import React from 'react'

export default function Test() {

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
        {arr.map( (a) => (
            <li key={a}>{a}</li>
        ) )}
    </>
  )
}