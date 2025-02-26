import React, { useState } from "react";
import axios from "axios";

const CrimeSummarization = () => {
    const [crimeReport, setCrimeReport] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        if (!crimeReport.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/summarize", { text: crimeReport });
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error summarizing text:", error);
            setSummary("Error generating summary.");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-5 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Crime Data Summarization</h2>
            <textarea
                className="w-full p-2 border rounded-md"
                rows="5"
                placeholder="Enter crime report..."
                value={crimeReport}
                onChange={(e) => setCrimeReport(e.target.value)}
            ></textarea>
            <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSummarize}
                disabled={loading}
            >
                {loading ? "Summarizing..." : "Summarize"}
            </button>
            {summary && (
                <div className="mt-4 p-3 bg-white border rounded-md shadow">
                    <h3 className="font-semibold">Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default CrimeSummarization;
