import React, { ChangeEvent, useState, useEffect, FormEvent } from "react";
import CovidCheck from "./CovidCheck";
import * as CovidCheckService from "./CovidCheckService";
import { toast } from "react-toastify";

import CovidCheckItem from "./CovidCheckItem";

type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const CovidGrid = () => {
  /**
   * Get ALL checks
   */
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

  /**
   * Filters
   */
  const aFiltersOptionsResults = ["Sano", "Infectado", "Inmune"];
  const [aFiltersOptionsCountries, setFiltersOptionsCountries] = useState<string[]>([]);

  const loadCountries = async () => {
    const oResponse = await CovidCheckService.getCountries();
    setFiltersOptionsCountries(oResponse.data);
  };

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
      setFilters({
        ...oFilters,
        "filter-by": sFilterBy,
        "filter-value": aFiltersOptionsCountries.length > 0 ? aFiltersOptionsCountries[0] : "",
        valueOptions: aFiltersOptionsCountries,
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
      loadCovidChecks();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (oFilters["filter-by"] === "" || oFilters["filter-value"] === "")
      toast.warning("Debe completar el criterio de búsqueda.");

    const oResponse = await CovidCheckService.searchChecks(
      oFilters["filter-by"],
      oFilters["filter-value"]
    );

    const aCovidChecks = oResponse.data.map((oCovidCheck: CovidCheck) => {
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
    loadCountries();
  }, []);

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

      <div className="col-md-12">
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
                <CovidCheckItem
                  oCovidCheck={oCovidCheck}
                  key={oCovidCheck._id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CovidGrid;
