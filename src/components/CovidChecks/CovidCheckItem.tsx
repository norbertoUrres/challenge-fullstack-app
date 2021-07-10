import React from "react";
import { Link } from "react-router-dom";
import CovidCheck from "./CovidCheck";
import { useHistory } from "react-router-dom";

interface props {
  oCovidCheck: CovidCheck;
}

const CovidCheckItem = ({ oCovidCheck }: props) => {
  const oHistory = useHistory();

  let sClassResult = "";
  switch (oCovidCheck.result) {
    case "Sano":
      sClassResult = "text-success";
      break;
    case "Infectado":
      sClassResult = "text-danger";
      break;
    case "Inmune":
      sClassResult = "text-info";
      break;
    default:
      sClassResult = "text-info";
      break;
  }

  return (
    <tr>
      <td>{oCovidCheck.name}</td>
      <td>{oCovidCheck.country}</td>
      <td>
        <strong className={sClassResult}>{oCovidCheck.result}</strong>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => oHistory.push(`/check-detail/${oCovidCheck._id}`)}
        >
          Detalle
        </button>
      </td>
    </tr>
  );
};

export default CovidCheckItem;
