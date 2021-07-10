import { isArray } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CovidCheck from "./CovidCheck";
import * as CovidCheckService from "./CovidCheckService";

interface props {
  oCovidCheck: CovidCheck;
}

interface Params {
  id: string;
}

const CovidCheckDetail = () => {
  const oUseParams = useParams<Params>();

  const [oCovidCheck, setCovidCheck] = useState<CovidCheck>({
    name: "",
    country: "",
    dna: [],
  });

  const getCovidCheck = async (id: string) => {
    const oResponse = await CovidCheckService.getCovidCheck(id);
    const { _id, name, country, result, dna } = oResponse.data;
    setCovidCheck({ _id, name, country, result, dna });
  };

  useEffect(() => {
    if (oUseParams.id) getCovidCheck(oUseParams.id);
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <Link className="btn btn-info" to="/">
              Atrás
            </Link>

            <h2 className="mt-3">Detalle</h2>
            <p>
              <strong>ID:</strong> {oCovidCheck._id}
            </p>
            <p>
              <strong>Nombre:</strong> {oCovidCheck.name}
            </p>
            <p>
              <strong>País:</strong> {oCovidCheck.country}
            </p>
            <p>
              <strong>Resultado:</strong> {oCovidCheck.result}
            </p>
            <p>
              <strong>DNA:</strong>{" "}
              {isArray(oCovidCheck.dna) &&
                oCovidCheck.dna.map((sSec, i) => (
                  <span key={i} className="d-block">{sSec}</span>
                ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CovidCheckDetail;
