import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Home = () => {
  const series1 = [
    {
      name: 'Vehiculos alquilados',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
    {
      name: 'Vehiculos disponibles',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    },
    {
      name: 'Solicitudes pendientes',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    },
  ];

  const options1 = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth',
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    fill: {
      opacity: [0.85, 0.25, 1],
    },
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003',
    ],
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Cantidad',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  // Segundo gráfico (Pie Chart)
  const series2 = [44, 55, 13, 43, 22];
  const options2 = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: [ 'Vehículos Alquilados',
        'Vehículos Disponibles',
        'Vehículos en Mantenimiento',
        'Vehículos Reservados',
        'Vehículos en Tránsito',],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  // Tercer gráfico (Bar Chart)
  const series3 = [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];
  const options3 = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$ ${val} thousands`,
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      {/* Primera fila */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <ReactApexChart options={options1} series={series1} type="line" height={350} />
        </div>
        <div style={{ flex: 1 }}>
          <ReactApexChart options={options2} series={series2} type="pie" height={350} />
        </div>
      </div>
      {/* Segunda fila */}
      <div style={{ marginTop: '20px' }}>
        <ReactApexChart options={options3} series={series3} type="bar" height={350} />
      </div>
    </div>
  );
};

export default Home;
