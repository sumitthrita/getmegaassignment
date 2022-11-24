/* 
List component is used to render a list of values arranged as a table.
It takes 2 props
-headers :[]  
-values :[[],[],[] ...]  

1. headers
eg. ['Name', 'Number']
 The length of header array will decide the number of columns the table has.

2.values
eg. [['Sumit', '23456543'], ['John','111989876']] 

  A 2d array. Every element in the values array is also an array.
  Length of the values array decides the number of rows the table has.
  These sub-arrays represent the values for that particular row.

*/

import React from "react";


function List(props) {
  let { headers, values } = props;
  if (!headers) {
    headers = [];
  }

  //creating headers for the table
  let tableHeaders = (
    <div className="table-header-group">
      <div className="table-row">
        {headers.map((heading) => {
          return (
            <div key={heading} className="table-cell">
              {heading}
            </div>
          );
        })}
      </div>
    </div>
  );


  //creating rows
  let tableRows = (
    <div className="table-row-group">
      {values?.map((rowVal) => {
          return (
            <div className="table-row">
              {rowVal.map((value, i) => {
                return (
                  <div key={i} className="table-cell">
                    {value}
                  </div>
                );
              })}
            </div>
          );
      })}
    </div>
  );

  return (
    <React.Fragment>
      <div className={`table_list ${props.customClass}`}>
        {headers.length > 0 && tableHeaders}
        {tableRows}
      </div>
    </React.Fragment>
  );
}

export default List;
