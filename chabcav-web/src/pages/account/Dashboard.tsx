//import React, { useEffect } from "react";
import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ChartData,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import 'jsvectormap'
import 'jsvectormap/dist/maps/world.js'
import JsVectorMap from 'jsvectormap';




ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  


const Dashboard: React.FC = () => {
  interface CountryData {
    country: string;
    flag: string;
    noOfUsers: number;
  }

  interface CountryCoordinates {
    name: string;
    coords: [number, number];
  }
  

  const [userCountryData, setUserCountryData] = React.useState<CountryData[]>([]);
  const [barChartData, setBarChartData] = React.useState<number[]>([]);
  const [monthlyVisit, setMonthlyVisit] = React.useState<number[]>([]);
  const [monthlyCompletedLessons, setMonthlyCompletedLessons] = React.useState<number[]>([]);
  const [monthlyTotalVisit, setMonthlyTotalVisit] = React.useState<number>(0);
  const [totalUsers, setTotalUsers] = React.useState<number>(0);
  const [countryCoordinates, setCountryCoordinates] = React.useState<CountryCoordinates[]>([]);
        // Table data
        // const countryData = [
        //   { country: "United States", flag: "/src/assets/css/accounts/img/icons/flags/US.png", sales: 2500, value: "$230,900", bounce: "29.9%" },
        //   { country: "Germany", flag: "/src/assets/css/accounts/img/icons/flags/DE.png", sales: 3900, value: "$440,000", bounce: "40.22%" },
        //   { country: "Great Britain", flag: "/src/assets/css/accounts/img/icons/flags/GB.png", sales: 1400, value: "$190,700", bounce: "23.44%" },
        //   { country: "Brazil", flag: "/src/assets/css/accounts/img/icons/flags/BR.png", sales: 562, value: "$143,960", bounce: "32.14%" },
        // ];
    
    
  //Data and options for Bar Chart
  useEffect(() => {

    async function fetchDashboardData(){
      const response = await fetch("http://localhost/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
     })

    const data = await response.json();

    const countryData: CountryData[] = data.result.countryData.map((item: any) => ({
      country: item.country,
      flag: item.flag,
      noOfUsers: item.noOfUsers,
    }));

    const countryCoords: CountryCoordinates[] = data.result.mapCoordinates.map((item: any) => ({
      name: item.country,
      coords: [item.coords[0], item.coords[1]] as [number, number],
    }));

    const noOfUsersInAWeek = data.result.noOfUsersInAWeek.map((item: any) => item);
    const monthlyUserData = data.result.monthlyVisit.map((item: any) => item);
    // const monthlyUserVisits = data.result.monthlyVisit.map((item: any) => item);
    const monthlyCompletedLessonsData = data.result.noOfUsersThatCompletedPerMonth.map((item: any) => item);
    const totalUsers = data.result.totalUsers;

    setUserCountryData(countryData);
    setBarChartData(noOfUsersInAWeek);
    setMonthlyVisit(monthlyUserData);
    setMonthlyCompletedLessons(monthlyCompletedLessonsData);
    setMonthlyTotalVisit(data.result.noOfVisits);
    setTotalUsers(totalUsers);
    setCountryCoordinates(countryCoords);
     console.log(data.result);



    }

    fetchDashboardData();

    //  const map = new JsVectorMap({
    //    selector: '#world-map',
    //    map: 'world', // Match the map name
    //    zoomOnScroll: true,
    //    zoomButtons: true,
    //    markers: 
    //   //  countryCoordinates
    //    [
    //      { name: 'USA', coords: [40.71296415909766, -74.00437720027804] },
    //      { name: 'Germany', coords: [51.17661451970939, 10.97947735117339]},
    //      { name: 'Brazil', coords: [-7.596735421549542, -54.781694323779185] },
    //      { name: 'Russia', coords: [62.318222797104276, 89.81564777631716] },
    //      { name: 'China', coords: [22.320178999475512, 114.17161225541399] },
    //    ]
      
       
    //  });
 
     // Clean up the map instance on unmount
     return () => {
      //  map.destroy();
     };
   }, []);

   useEffect(() => {
    if (countryCoordinates.length === 0) return;
  
    const map = new JsVectorMap({
      selector: "#world-map",
      map: "world",
      zoomOnScroll: true,
      zoomButtons: true,
      markers: countryCoordinates
    });
  
    return () => {
      map.destroy();
    };
  }, [countryCoordinates]);
 

  const barData: ChartData<"bar", number[], string> = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Visits",
        data: barChartData,
        backgroundColor: "#43A047",
        borderRadius: 4,
        barThickness: "flex",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#737373" },
      },
      y: {
        ticks: {
          color: "#737373",
          beginAtZero: true,
        },
        grid: { color: "#e5e5e5" },
      },
    },
  };

  // Data and options for Line Chart
  const lineData = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [
      {
        label: "Visits",
        data: monthlyCompletedLessons,
        borderColor: "#43A047",
        pointBackgroundColor: "#43A047",
        pointBorderColor: "transparent",
      },
    ],
  };

  const monhtlyVisitlineData = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [
      {
        label: "Mobile apps",
        data: monthlyVisit,
        borderColor: "#43A047",
        pointBackgroundColor: "#43A047",
        pointBorderColor: "transparent",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const months = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            return months[context[0].dataIndex];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#737373" },
      },
      y: {
        ticks: { color: "#737373", beginAtZero: true },
        grid: { color: "#e5e5e5" },
      },
    },
  };

   // Function to handle mouse movement
    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        if (event.clientX <= 10) {
          setIsSidebarCollapsed(false); // Expand if mouse is at the leftmost 10px
        } else if (event.clientX > 260) {
          setIsSidebarCollapsed(true); // Collapse if mouse moves far from the sidebar
        }
      };
  
      window.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);
 

  return (
    <div className="container-fluid py-4" 
    style={{paddingLeft: "250px", transition: "margin 0.3s ease-in-out",
      marginLeft: isSidebarCollapsed ? "0" : "250px",
      width: isSidebarCollapsed ? "100%" : "calc(100% - 250px)",}}>
      {/* Page Header */}
      <div className="row">
        <div className="col-lg-12 position-relative z-index-2">
          <div className="row mb-4">
          <div className="col-lg-5 ms-3 col-sm-8">
            <h3 className="mb-0 h4 font-weight-bolder">Dashboard</h3>
            <p className="mb-4">Administration visualization</p>
          </div>
          </div>

          {/* Charts Section */}
          <div className="row mb-4">
            {[
              {
                title: "Website Visit",
                description: "Daily Traffic",
                chartId: "chart-bars",
                updateInfo: "just updated",
                chart: <Bar data={barData} options={barOptions} />
              },
              {
                title: "Monthly Visit",
                description: "Daily Sessions",
                chartId: "chart-line",
                updateInfo: "just updated",
                chart: <Line data={monhtlyVisitlineData} options={lineOptions} />
              },
              {
                title: "No. of Users That Completed Lessons Per Month",
                description: "Daily Sessions",
                chartId: "chart-line-tasks",
                updateInfo: "just updated",
                chart: <Line data={lineData} options={lineOptions} />
              },
            ].map((chart, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 mb-4"
              >
                <div className="card">
                  <div className="card-body">
                    <h6 className="mb-0">{chart.title}</h6>
                    <p className="text-sm">{chart.description}</p>
                    <div className="pe-2">
                      <div className="chart">
                     {chart.chart}
                      </div>
                    </div>
                    <hr className="dark horizontal" />
                    <div className="d-flex">
                      <i className="material-symbols-rounded text-sm my-auto me-1">
                        schedule
                      </i>
                      <p className="mb-0 text-sm">{chart.updateInfo}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
            <div className="row justify-content">
            {[{
              title: "Visits",
              value: monthlyTotalVisit,
              icon: "leaderboard",
              growth: ""
              },
              {
              title: "Total Users",
              value: totalUsers,
              icon: "leaderboard",
              growth: ""
              },
            ].map((stat, index) => (
              <div
              key={index}
              className="col-lg-6 col-md-5 col-sm-12 mb-4"
              >
              <div className="card mb-2">
                <div className="card-header p-2 ps-3">
                <div className="d-flex justify-content-between">
                  <div>
                  <p className="text-sm mb-0 text-capitalize">{stat.title}</p>
                  <h4 className="mb-0">{stat.value}</h4>
                  </div>
                  <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                  <i className="material-symbols-rounded opacity-10">{stat.icon}</i>
                  </div>
                </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-2 ps-3">
                <p className="mb-0 text-sm">
                  <span className="text-success font-weight-bolder">
                  {stat.growth}
                  </span>{" "}
                  than last week
                </p>
                </div>
              </div>
              </div>
            ))}
            </div>
        </div>
      </div>
      <div className="mt-4">
      <div className="card mb-4">
        <div className="card-header pb-0">
          <h6 className="mb-0">Users by Country</h6>
          <p className="mb-2 text-sm">Users accessing the site by country.</p>
        </div>
        <div className="card-body p-3">
          <div className="row">
            {/* Table Section */}
            <div className="col-lg-6 col-md-7">
              <div className="table-responsive">
                <table className="table align-items-center">
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>No. of Users</th>
                      {/* <th>Value</th>
                      <th>Bounce</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {userCountryData.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={data.flag} alt={`${data.country} flag`} style={{ width: "30px" }} />
                            <span className="ms-3">{data.country}</span>
                          </div>
                        </td>
                        <td>{data.noOfUsers}</td>
                        {/* <td>{data.value}</td> */}
                        {/* <td>{data.bounce}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Map Section */}
            <div className="col-lg-6 col-md-5">
              <div id="world-map" style={{ height: "400px", width: "100%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Dashboard;
