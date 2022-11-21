import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  statisticsApi,
  statcs,
  historyy,
  countries,
  historyApi,
} from "./services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Table from "./components/Table";
import BarChart from "./components/BarChart";
function App() {
  const [statistics, setStatistics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filterCountry, setFilterCountry] = useState("");
  const [filteredList, setFilterdList] = useState();
  const [country, setCountry] = useState("usa");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [history, setHistory] = useState([]);

  const [covidHistory, setCovidHistory] = useState([]);
  const [covidHistoryDeaths, setCovidHistoryDeaths] = useState([]);

  const [covidHistoryTests, setCovidHistoryTests] = useState([]);

  useEffect(() => {
    const getStatistics = async () => {
      await axios
        .get("https://covid-193.p.rapidapi.com/statistics", statisticsApi)
        .then(function (response) {
          setStatistics(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getStatistics();
  }, []);

  useEffect(() => {
    const getHistory = async () => {
      setIsLoadingHistory(true);
      await axios
        .get("https://covid-193.p.rapidapi.com/history/", historyApi(country))
        .then(function (response) {
          setCovidHistory({
            labels: response.data?.response?.map((data) => data.time),
            datasets: [
              {
                label: "Cases",
                data: response?.data?.response?.map((data) => data.cases.total),
              },
            ],
          });
          setCovidHistoryDeaths({
            labels: response?.data?.response?.map((data) => data.time),
            datasets: [
              {
                label: "Deaths",
                data: response?.data?.response?.map(
                  (data) => data.deaths.total
                ),
                // backgroundColor: "red",
                // Width: 7
              },
            ],
          });
          setCovidHistoryTests({
            labels: response?.data?.response?.map((data) => data.time),
            datasets: [
              {
                label: "Tests",
                data: response?.data?.response?.map((data) => data.tests.total),
              },
            ],
          });
          setIsLoadingHistory(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getHistory();
  }, [country]);

  useEffect(() => {
    const filterdData = statistics?.response?.filter((data) =>
      data.country
        .toLocaleLowerCase()
        .includes(filterCountry.toLocaleLowerCase())
    );
    setFilterdList(filterdData);
  }, [filterCountry]);

  if (isLoading) {
    return (
      <div className="spin">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>loading</h1>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  // const options = {
  //   scales: {
  //     x: {
  //       type: "time",
  //       time: {
  //         unit: "hour",
  //       },
  //       ticks: {
  //         // min: 0,
  //         stepSize: 1,
  //       },
  //       beginAtZero: true,
  //       minBarThickness: 100,
  //     },
  //     y: {
  //       ticks: {
  //         // min: 0,
  //         // stepSize:1000000
  //       },
  //       // beginAtZero: true
  //     },
  //   },
  //   plugins: {
  //     title: {
  //         display: true,
  //         text: `${country.toUpperCase()}`,
  //         padding: {
  //             top: 10,
  //             bottom: 30

  //         },
  //         font: {
  //           size: 25
  //       }
  //     }
  // }
  // };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // lable position left/right/top/bottom
        labels: {
          fontSize: 16, //point style's size is based on font style not boxed width.
          usePointStyle: true,
        },
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
        },
        display: true, // show/ hide x-axis
        grid: {
          display: false, // show/hide grid line in x-axis
        },
        ticks: {
          font: {
            size: 20,
          },
        },
      },
      y: {
        display: true, // same as x-axis
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 20,
          },
          callback: function (value, index, values) {
            if (value >= 1000000000 || value <= -1000000000) {
              return value / 1e9 + "B";
            } else if (value >= 1000000 || value <= -1000000) {
              return value / 1e6 + "M";
            } else if (value >= 1000 || value <= -1000) {
              return value / 1e3 + "K";
            }
            return value;
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `${country.toUpperCase()}`,
        padding: {
          top: 10,
          bottom: 30,
        },
        font: {
          size: 25,
        },
      },
    },
  };

  const hundleChange = (e) => {
    e.preventDefault();
    setFilterCountry(e.target.value);
  };

  const setFilteringCountry = (e, rowdata) => {
    e.preventDefault();
    setCountry(rowdata);
  };
  // if (filterCountry) {
  //   console.log(filteredList);
  // }

  return (
    <div className="App">
      <Table
        statistics={filteredList ? filteredList : statistics.response}
        filterCountry={filterCountry}
        hundleChange={hundleChange}
        setFilteringCountry={setFilteringCountry}
      />

      {isLoadingHistory ? (
        ""
      ) : (
        <BarChart
          covidHistory={covidHistory}
          covidHistoryDeaths={covidHistoryDeaths}
          covidHistoryTests={covidHistoryTests}
          opt={options}
        />
      )}
    </div>
  );
}

export default App;
