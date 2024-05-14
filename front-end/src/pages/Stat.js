import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Card, Paper, CardHeader, Box } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";
import chroma from "chroma-js";

function generateColors(baseColor, pieces) {
  const baseHue = chroma(baseColor).get("hsl.h");
  let colors = [];

  for (let i = 0; i < pieces; i++) {
    const hue = (baseHue + (240 / pieces) * i) % 360; // ensure hue stays within 0-360
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
  const theme = useTheme();
  const [fullData, setFullData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:3013/allPrescriptions");
        const data = await response.json();
        setFullData(data);

        const medicationCounts = {};
        data.forEach((prescription) => {
          const medication = prescription.Medicament;
          medicationCounts[medication] =
            (medicationCounts[medication] || 0) + 1;
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

        const baseColor = "#D62F45"; // Example base color
        const colors = generateColors(baseColor, labels.length);

        setChartData({ labels, series, colors });
      } catch (error) {
        console.error("Failed to fetch statistics", error);
      }
    };

    fetchStats();
  }, []);

  // Handle cases where chartData may not be fully defined
  if (!chartData) {
    return <Typography>Loading chart data...</Typography>; // or any other fallback UI
  }
  const chartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
      },
    },
    colors: chartData.colors, // Use dynamically generated colors
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
      <Box display="flex" justifyContent="flex-end">
        <Paper>
          <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />
          <StyledChart
            options={chartOptions}
            series={chartData.series}
            type="pie"
            width="100%"
            height="90%"
          />
        </Paper>
      </Box>
      <Box component="div" sx={{ overflowY: "auto", maxHeight: 300 }}>
        {fullData.map((item, index) => (
          <Typography key={index}>
            {item.Medicament}: {item.Details} on {item.Date}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

MedicationUsageChart.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};

export default MedicationUsageChart;
