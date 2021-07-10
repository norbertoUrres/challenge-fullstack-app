import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CovidCheck from "./CovidCheck";
import * as CovidCheckService from "./CovidCheckService";

import CovidStats from "./CovidStats";
import CovidGrid from "./CovidGrid";
import CovidChecksList from "./CovidChecksList";
import CovidCheckFilters from "./CovidCheckFilters";

const CovidChecks = () => {
  const [aCovidChecks, setCovidChecks] = useState<CovidCheck[]>([]);

  const loadCovidChecks = async () => {
    const oResponse = await CovidCheckService.getCovidChecks();
    const aCovidChecks = oResponse.data.map((oCovidCheck) => {
      return {
        ...oCovidCheck,
        createdAt: oCovidCheck.createdAt
          ? new Date(oCovidCheck.createdAt)
          : new Date(),
      };
    });
    setCovidChecks(aCovidChecks);
  };

  useEffect(() => {
    loadCovidChecks();
  }, []);

  return (
    <div className="row">
      <div className="col-sm-12">
        <CovidStats></CovidStats>
        <Link className="btn btn-primary mb-3" to="/new-check">
          Cargar Análisis
        </Link>
        <CovidGrid></CovidGrid>
        {/* <CovidCheckFilters aCovidChecks={aCovidChecks}></CovidCheckFilters> */}
        {/* <CovidChecksList aCovidChecks={aCovidChecks}></CovidChecksList> */}
      </div>
    </div>
  );
};

export default CovidChecks;
