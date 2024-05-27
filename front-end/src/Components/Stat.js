import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, CardHeader, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chart from "react-apexcharts";
import chroma from "chroma-js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function to generate colors for the pie chart
function generateColors(baseColor, pieces) {
  const baseHue = chroma(baseColor).get("hsl.h");
  let colors = [];
  for (let i = 0; i < pieces; i++) {
    const hue = (baseHue + (360 / pieces) * i) % 360;
    const color = chroma(baseColor).set("hsl.h", hue).css();
    colors.push(color);
  }
  return colors;
}

const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  "& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject": {
    height: `100% !important`,
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

function MedicationUsageChart({ title, subheader }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch("http://localhost:3013/allPrescriptions");
      const jsonData = await response.json();
      console.log("Fetched data:", jsonData);

      const medicationCounts = {};
      jsonData.forEach((prescription) => {
        const medication = prescription.Medicament;
        medicationCounts[medication] = (medicationCounts[medication] || 0) + 1;
      });

      const sortedMedications = Object.entries(medicationCounts).sort(
        (a, b) => b[1] - a[1]
      );
      const topMedications = sortedMedications.slice(0, 8);
      const otherCount = sortedMedications
        .slice(8)
        .reduce((acc, curr) => acc + curr[1], 0);

      const labels = topMedications.map((item) => item[0]);
      const series = topMedications.map((item) => item[1]);
      if (otherCount > 0) {
        labels.push("Other");
        series.push(otherCount);
      }

      const baseColor = "#D62F45";
      const colors = generateColors(baseColor, labels.length);
      setChartData({ labels, series, colors });
    };

    fetchStats();
  }, []);

  if (!chartData) {
    return <Typography>Loading chart data...</Typography>;
  }

  const pieChartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    colors: chartData.colors,
    labels: chartData.labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}`,
        title: {
          formatter: (seriesName) => `${seriesName}:`,
        },
      },
    },
  };

  return (
    <Box>
      <Card
        className="card-chart"
        sx={{
          width: "35%",
          height: "40%",
        }}
      >
        <CardHeader>
          <Typography variant="h5" className="card-category">
            Medication Usage
          </Typography>
          <Typography variant="h2">Distribution</Typography>
        </CardHeader>
        <CardContent>
          <div className="chart-area">
            <StyledChart
              options={pieChartOptions}
              series={chartData.series}
              type="pie"
              width="100%"
              height="400"
            />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}

MedicationUsageChart.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};

export default MedicationUsageChart;
