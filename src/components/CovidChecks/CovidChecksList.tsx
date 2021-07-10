import React, { useEffect, useState } from "react";

import CovidCheck from "./CovidCheck";
import CovidCheckItem from "./CovidCheckItem";

interface props {
  aCovidChecks: CovidCheck[];
}

const CovidCheckList = ({ aCovidChecks }: props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>País</th>
          <th>Resultado</th>
          <th>Detalle</th>
        </tr>
      </thead>
      <tbody>
        {aCovidChecks.map((oCovidCheck) => {
          return (
            <CovidCheckItem oCovidCheck={oCovidCheck} key={oCovidCheck._id} />
          );
        })}
      </tbody>
    </table>
  );
};

export default CovidCheckList;
