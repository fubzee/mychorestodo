import React from "react";

// In our return method, we use the map method to return a new array of `li` and `img` elements that are specific to each search result
function ResultList(props) {
  return (
    <div>
      <ul>
        {props.results.map((result) => (
          <li key={result.id}>
            <p>{result.name}</p>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultList;
