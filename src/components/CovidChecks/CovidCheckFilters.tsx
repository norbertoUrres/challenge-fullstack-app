import React, { ChangeEvent, useState, useEffect, FormEvent } from "react";
import CovidCheck from "./CovidCheck";
import * as CovidCheckService from "./CovidCheckService";
import { toast } from "react-toastify";

type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

interface props {
  aCovidChecks: CovidCheck[];
}

const CovidCheckFilters = ({ aCovidChecks }: props) => {
  const aFiltersOptionsResults = ["Sano", "Infectado", "Inmune"];

  const [oFilters, setFilters] = useState({
    "filter-by": "",
    "filter-value": "",
    valueOptions: new Array<string>(),
  });

  const handleSelectChange = (e: InputChange) => {
    setFilters({ ...oFilters, [e.target.name]: e.target.value });
  };

  const handleFilterByChange = (e: InputChange) => {
    const sFilterBy = e.target.value;
    if (sFilterBy === "country") {
      const aFiltersOptionsCountry = aCovidChecks
        .map((oCovidCheck) => oCovidCheck.country)
        .filter(
          (sCountry, iIndex, aArrSelf) => aArrSelf.indexOf(sCountry) === iIndex
        );

      setFilters({
        ...oFilters,
        "filter-by": sFilterBy,
        "filter-value":
          aFiltersOptionsCountry.length > 0 ? aFiltersOptionsCountry[0] : "",
        valueOptions: aFiltersOptionsCountry,
      });
    } else if (sFilterBy === "result") {
      setFilters({
        ...oFilters,
        "filter-by": sFilterBy,
        "filter-value": aFiltersOptionsResults[0],
        valueOptions: aFiltersOptionsResults,
      });
    } else {
      setFilters({ ...oFilters, "filter-by": "", valueOptions: [] });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (oFilters["filter-by"] === "" || oFilters["filter-value"] === "")
      toast.warning("Debe completar el criterio de búsqueda.");

    CovidCheckService.searchChecks(
      oFilters["filter-by"],
      oFilters["filter-value"]
    );
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h5>Filtros:</h5>
      </div>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <div className="mb-3">
            <select
              name="filter-by"
              className="form-control"
              onChange={handleFilterByChange}
            >
              <option value="*">Filtrar por ...</option>
              <option value="country">País</option>
              <option value="result">Resultado</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <select
              name="filter-value"
              className="form-control"
              onChange={handleSelectChange}
            >
              {oFilters.valueOptions.map((options) => {
                return (
                  <option key={options} value={options}>
                    {options}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <button className="btn btn-primary">Aplicar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CovidCheckFilters;
