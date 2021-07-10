import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CovidCheck from "./CovidCheck";
import * as CovidCheckService from "./CovidCheckService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import _, { isString } from "lodash";

const CovidChecksForm = () => {
  const oHistory = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<CovidCheck>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<CovidCheck> = async (oCovidCheck) => {
    // Convert DNA to Array of String
    let sDna = oCovidCheck.dna, aAuxArr = [];
    let iDnaLength = sDna.length;
    let iRowLength = Math.floor(Math.sqrt(iDnaLength));
    let iCount = 0;
    while (iCount < iDnaLength) {
      if (isString(sDna)) aAuxArr.push(sDna.substr(iCount, iRowLength));
      iCount += iRowLength;
    }
    oCovidCheck.dna = aAuxArr;
    
    await CovidCheckService.createCovidChecks(oCovidCheck);
    toast.success("¡Análisis cargado con éxito!");
    oHistory.push("/");
  };

  const fnValidateDna = (sDna: any) => {
    let iLengthDna = sDna.length;
    let iRows, iColumns;
    iRows = Math.floor(Math.sqrt(iLengthDna));
    iColumns = Math.ceil(Math.sqrt(iLengthDna));
    return iRows === iColumns;
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h1>Nuevo Análisis</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="form-control"
                  {...register("name", { required: true })}
                />
                {errors.name && <div className="invalid-feedback d-block">Este campo es requerido.</div>}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  placeholder="País"
                  className="form-control"
                  {...register("country", { required: true })}
                />
                {errors.country && <div className="invalid-feedback d-block">Este campo es requerido.</div>}
              </div>

              <div className="mb-3">
                <textarea
                  rows={3}
                  className="form-control"
                  {...register("dna", {
                    required: "Este campo es requerido.",
                    pattern: {
                      value: /^[ATCGatcg]+$/,
                      message: "Solo se permiten los caracteres A,T,C y G.",
                    },
                    minLength: {
                      value: 16,
                      message:
                        "El DNA debe tener al menos 16 caracteres de longitud.",
                    },
                    validate: fnValidateDna,
                  })}
                ></textarea>
                <ErrorMessage
                  errors={errors}
                  name="dna"
                  render={({ messages }) => {
                    return messages ? _.entries(messages).map(([type, message]) => (
                      (type === "validate") ? <div className="invalid-feedback d-block" key={type}>El DNA está incompleto.</div> : <div className="invalid-feedback d-block" key={type}>{message}</div>
                    )) : null;
                  }}
                />
              </div>

              <button className="btn btn-primary">Crear</button>
              <Link className="btn btn-secondary ms-2" to="/">
                Cancelar
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CovidChecksForm;
