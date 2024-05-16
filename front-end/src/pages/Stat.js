import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Card,
  Paper,
  CardHeader,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Chart from "react-apexcharts";
import chroma from "chroma-js";

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
  const [fullData, setFullData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch("http://localhost:3013/allPrescriptions");
      const jsonData = await response.json();
      setFullData(jsonData);

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

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 7
    );

    const filteredData = fullData.filter(
      (item) =>
        new Date(item.Date) >= startDate && new Date(item.Date) <= endDate
    );

    console.log("Filtered Data:", filteredData); // Check what data is being filtered

    const series = selectedMeds.map((med) => ({
      name: med,
      data: filteredData
        .filter((item) => item.Medicament === med)
        .map((d) => ({
          x: new Date(d.Date).getTime(),
          y: 1,
        })),
    }));

    console.log("Series Data:", series); // Verify the structure and contents of the series data

    setTimelineData(series);
  }, [selectedMeds, fullData]);

  const handleMedicationChange = (event) => {
    setSelectedMeds(event.target.value);
  };

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

  const lineChartOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleDateString(); // Convertit le timestamp en date lisible
        },
      },
      // Assurez-vous que l'axe X représente une période de 7 jours
      min: new Date(new Date().setDate(new Date().getDate() - 7)).getTime(), // Définir le minimum à 7 jours avant
      max: new Date().getTime(), // Définir le maximum à aujourd'hui
      tickAmount: 7, // Nombre de ticks sur l'axe, correspondant à 7 jours
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Paper>
          <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />
          <StyledChart
            options={pieChartOptions}
            series={chartData.series}
            type="pie"
            width="100%"
            height="90%"
          />
        </Paper>
      </Box>
      <Box sx={{ mt: 5, width: "50vw" }}>
        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
          <InputLabel>Select Medications</InputLabel>
          <Select
            multiple
            value={selectedMeds}
            onChange={handleMedicationChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {[...new Set(fullData.map((item) => item.Medicament))].map(
              (medication, index) => (
                <MenuItem key={index} value={medication}>
                  {medication}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <Chart
          options={lineChartOptions}
          series={timelineData}
          type="line"
          width="100%"
          height={300}
        />
      </Box>
    </Box>
  );
}

MedicationUsageChart.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};

export default MedicationUsageChart;
