import React, { useState, useEffect } from "react";
import Anomaly from './Image/Anomaly.png';

const CrimeAnalysis = () => {
  const [hotspotMap, setHotspotMap] = useState(null);
  const [clusterMap, setClusterMap] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

  
    fetch("http://127.0.0.1:5000/crime-hotspots")
      .then(response => response.text())
      .then(data => setHotspotMap(data))
      .catch(error => {
        setError("Error loading crime hotspots.");
        console.error(error);
      });

    fetch("http://127.0.0.1:5000/crime-clusters")
      .then(response => response.text())
      .then(data => setClusterMap(data))
      .catch(error => {
        setError("Error loading crime clusters.");
        console.error(error);
      });

    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="crime-analysis-container">
      <h1 className="Title">Crime Analysis</h1>

    
      <div className="analysis-section">
        <div className="map-container">
          <h2 className="crimeTrends">Crime Hotspots</h2>
          {hotspotMap ? (
            <iframe
              srcDoc={hotspotMap}
              className="map-frame"
              title="Crime Hotspots Map"
            />
          ) : (
            <p>Unable to load crime hotspots.</p>
          )}
        </div>
        <div className="description">
          <p>
          These areas, highlighted in red, are identified using AI-driven spatial analysis 
          techniques, which detect high-crime zones by analyzing historical crime data, trends, and geospatial patterns.
          </p>
        </div>
      </div>

  
      <div className="analysis-section">
        <div className="map-container">
          <h2 className="crimeTrends">Crime Clusters</h2>
          {clusterMap ? (
            <iframe
              srcDoc={clusterMap}
              className="map-frame"
              title="Crime Clusters Map"
            />
          ) : (
            <p>Unable to load crime clusters.</p>
          )}
        </div>
        <div className="description">
          <p>
          Crime locations are categorized into different risk levels based on historical data.
          Each cluster is assigned a color-coded label to indicate crime severity:
          <ul>
            <li>Red - 0 - High Crime</li>
            <li>Blue - 1 - Medium Crime</li>
            <li>Green - 2 - Low Crime </li>
          </ul>
          </p>
        </div>
      </div>
      <div className="analysis-section">
        <div className="map-container">
          <h2 className="crimeTrends">Crime Anomalies</h2>
          <img src={Anomaly} alt="Crime Anomalies" className="crime-image" />
        </div>
        <div className="description">
          <p>
          An anomaly in crime data refers to an unusual or unexpected deviation from established patterns, often indicating a sudden 
          spike or drop in crime rates. In Karachi, the Isolation Forest algorithm detected an anomaly due to a 13% rise in total crimes from 9,933 2023 to 11,329 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrimeAnalysis;
