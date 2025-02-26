import React from 'react';
import { Link } from 'react-router-dom';


export default function About() {
  return (
    <div className="container-fluid aboutDiv">
        <h3 className="Title">About Crime Dashboard</h3>
        <h4 className="subTitle">AI-Powered Crime Analysis</h4>
          <p className="aboutPara">
            The Sindh Crime Dashboard leverages artificial intelligence to provide 
            deeper insights into crime patterns. Using <b>K-Means Clustering</b>, the 
            platform detects crime hotspots, while <b>Anomaly Detection models</b> such 
            as Isolation Forest identify unusual crime trends. These 
            AI-driven techniques help in recognizing emerging threats and crime fluctuations over time.
          </p>

          <h4 className="subTitle">Data Visualization & Insights</h4>
          <p className="aboutPara">
            Crime data is presented through <b>interactive charts, graphs, and heatmaps</b>, 
            making it easier to analyze trends across different crime categories. The dashboard 
            offers a structured breakdown of crime statistics, including murder cases, theft, 
            police interventions, and vehicle-related crimes. By transforming raw data into 
            visually intuitive representations, it enables a clearer understanding of crime patterns across Sindh.
          </p>

          <h4 className="subTitle">Official Data Source</h4>
          <p className="aboutPara">
            All crime statistics displayed on the dashboard are sourced from <b>Sindh Police 
            records covering the years 2023 to 2024</b>. However, this data is <b>not real-time </b>  
             the platform offers valuable analytical tools, it should be used primarily for research 
            and policy development rather than live monitoring.
          </p>

          <h4 className="subTitle">Purpose & Users</h4>
          <p className="aboutPara">
            The dashboard serves as a resource for <b>law enforcement agencies, researchers, 
            policymakers, and citizens</b> seeking a data-driven understanding of crime trends. 
            By offering a detailed view of crime patterns, it helps in shaping security strategies, 
            guiding policy decisions, and increasing public awareness about crime in Sindh.
          </p>
          <p className="aboutPara">
        <b>Note:</b> This dashboard does not provide real-time data. Crime statistics are sourced from the official Sindh Police website: 
        <a href="https://sindhpolice.gov.pk/crime-statistics" target='blank'> Sindh Police Crime Statistics</a>
        </p>
        <Link className="button" to="/explore">Explore</Link>
    </div>
  );
}
