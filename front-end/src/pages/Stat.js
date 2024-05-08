// ExampleComponent.js
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";

const Stat = () => {
  const [medicationStats, setMedicationStats] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);

  // Fetch medication stats on component mount
  useEffect(() => {
    // Replace these URLs with your actual API paths
    const countByMedicationUrl =
      "http://localhost:3013/countPrescriptionsByMedication";
    const countByDateUrl = "http://localhost:3013/countPrescriptionsByDate";

    // Fetch medication stats (total count by medication)
    fetch(countByMedicationUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json(); // Parse JSON data
      })
      .then((data) => {
        setMedicationStats(data); // Set the state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching medication stats:", error);
      });

    // Fetch daily stats (count by medication per day)
    fetch(countByDateUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDailyStats(data);
      })
      .catch((error) => {
        console.error("Error fetching daily stats:", error);
      });
  }, []);

  return (
    <Box
      sx={{ marginTop: 4, marginLeft: 2, marginRight: 2, background: "red" }}
    >
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Medication Statistics
      </Typography>

      {/* Table: Medication Stats */}
      <Typography variant="h5" gutterBottom>
        Total Count by Medication
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Medication</TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicationStats.map((stat, index) => (
            <TableRow key={index}>
              <TableCell>{stat._id}</TableCell>
              <TableCell>{stat.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Table: Daily Stats */}
      <Typography variant="h5" gutterBottom>
        Daily Count by Medication
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Medication</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dailyStats.map((stat, index) => (
            <TableRow key={index}>
              <TableCell>{stat._id.Medicament}</TableCell>
              <TableCell>{stat._id.date}</TableCell>
              <TableCell>{stat.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Stat;
