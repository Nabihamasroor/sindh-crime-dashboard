from flask import Flask, jsonify, Response
from flask_cors import CORS
import pandas as pd
import folium
from sklearn.cluster import KMeans
import chardet

app = Flask(__name__)
CORS(app) 

file_path = "Vehicle.csv"
with open(file_path, "rb") as f:
    result = chardet.detect(f.read())
encoding_used = result["encoding"]

try:
    crime_data = pd.read_csv(file_path, encoding=encoding_used, dtype=str)
    print("✅ CSV Loaded Successfully with Encoding:", encoding_used)
except Exception as e:
    print(f"❌ Error Loading CSV: {e}")
    crime_data = None  
REQUIRED_COLUMNS = {"Latitude", "Longitude", "2024 Total"}
if crime_data is not None:
    crime_data.columns = crime_data.columns.str.strip()  
    missing_columns = REQUIRED_COLUMNS - set(crime_data.columns)
    if missing_columns:
        print(f"❌ Missing Required Columns: {missing_columns}")
        crime_data = None

@app.route('/crime-hotspots')
def crime_hotspots():
    """Generates a crime hotspot map using Latitude & Longitude."""
    if crime_data is None:
        return jsonify({"error": "Crime data not available"}), 500

    try:
        if not REQUIRED_COLUMNS.issubset(crime_data.columns):
            return jsonify({"error": f"Missing columns: {REQUIRED_COLUMNS - set(crime_data.columns)}"}), 400

        crime_data_filtered = crime_data.dropna(subset=["Latitude", "Longitude"]).copy()
        crime_data_filtered["Latitude"] = crime_data_filtered["Latitude"].astype(float)
        crime_data_filtered["Longitude"] = crime_data_filtered["Longitude"].astype(float)

        m = folium.Map(location=[crime_data_filtered["Latitude"].mean(), crime_data_filtered["Longitude"].mean()], zoom_start=7)

        for _, row in crime_data_filtered.iterrows():
            folium.CircleMarker(
                location=[row["Latitude"], row["Longitude"]],
                radius=5,
                color="red",
                fill=True,
                fill_color="red",
                fill_opacity=0.6
            ).add_to(m)

        return Response(m._repr_html_(), mimetype="text/html")

    except Exception as e:
        print(f"❌ Error generating hotspots: {e}")
        return jsonify({"error": "Error generating crime hotspots"}), 500


@app.route('/crime-clusters')
def crime_clusters():
    """Clusters crime locations using K-Means and assigns severity levels."""
    if crime_data is None:
        return jsonify({"error": "Crime data not available"}), 500

    try:
        if not REQUIRED_COLUMNS.issubset(crime_data.columns):
            return jsonify({"error": f"Missing columns: {REQUIRED_COLUMNS - set(crime_data.columns)}"}), 400

        crime_data["Latitude"] = crime_data["Latitude"].astype(float)
        crime_data["Longitude"] = crime_data["Longitude"].astype(float)
        crime_data["2024 Total"] = crime_data["2024 Total"].astype(int)
        X = crime_data[["Latitude", "Longitude", "2024 Total"]]
        kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
        crime_data["Cluster"] = kmeans.fit_predict(X)

        crime_data["Cluster"] = pd.cut(
            crime_data["2024 Total"],
            bins=[-1, crime_data["2024 Total"].quantile(0.33), crime_data["2024 Total"].quantile(0.66), crime_data["2024 Total"].max()],
            labels=[2, 1, 0]  
        ).astype(int)

        cluster_colors = {0: "red", 1: "blue", 2: "green"}

     
        m = folium.Map(location=[crime_data["Latitude"].mean(), crime_data["Longitude"].mean()], zoom_start=7)

        for _, row in crime_data.iterrows():
            cluster = row["Cluster"]
            folium.CircleMarker(
                location=[row["Latitude"], row["Longitude"]],
                radius=5,
                color=cluster_colors[cluster],
                fill=True,
                fill_color=cluster_colors[cluster],
                fill_opacity=0.7,
                popup=f"Crime: {row['2024 Total']}, Cluster: {cluster}"
            ).add_to(m)

        return Response(m._repr_html_(), mimetype="text/html")

    except Exception as e:
        print(f"❌ Error generating clusters: {e}")
        return jsonify({"error": "Error generating crime clusters"}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5000)
