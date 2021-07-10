import React, { useEffect, useState } from "react";
import * as CovidCheckService from './CovidCheckService'

interface Stats {
  healthy: 0;
  infected: 0;
  immune: 0;
}

const CovidStats = () => {
  const [oStats, setStats] = useState<Stats>();

  const loadStats = async () => {
    const oResponse = await CovidCheckService.getStats();
    setStats(oResponse.data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="row bg-light mb-3 p-4">
      <div className="col-md-4 text-center">
        <h3>
          Sanos <span className="badge bg-secondary">{oStats?.healthy}</span>
        </h3>
      </div>
      <div className="col-md-4 text-center">
        <h3>
          Infectados <span className="badge bg-secondary">{oStats?.infected}</span>
        </h3>
      </div>
      <div className="col-md-4 text-center">
        <h3>
          Inmunes <span className="badge bg-secondary">{oStats?.immune}</span>
        </h3>
      </div>
    </div>
  );
};

export default CovidStats;
