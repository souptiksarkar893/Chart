import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexCharts from "react-apexcharts";

function App() {
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://checkinn.co/api/v1/int/requests"
      );
      setRequestData(response.data.requests);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Calculate total number of requests
  const totalRequests = requestData.length;

  // Extract unique department names
  const uniqueDepartments = [
    ...new Set(requestData.map((data) => data.desk.name)),
  ];

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4">
        <h1 className="text-center mb-4">Requests Per Hotel</h1>
        <div className="chart-container">
          {requestData.length > 0 && (
            <React.Fragment>
              <ReactApexCharts
                options={{
                  chart: {
                    type: "line",
                    zoom: {
                      enabled: false,
                    },
                    toolbar: {
                      show: false,
                    },
                  },
                  xaxis: {
                    categories: requestData.map((data) => data.name),
                  },
                }}
                series={[
                  {
                    name: "Requests",
                    data: requestData.map((data) => data.id),
                  },
                ]}
                type="line"
                height={350}
              />
              <div>
                <p>Total requests: {totalRequests}</p>
                <p>
                  List of unique department names across all Hotels:{" "}
                  {uniqueDepartments.join(", ")}
                </p>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
