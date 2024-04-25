import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TablePagination } from '@mui/material';

const FruitQualityTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://savaglisic2001.pythonanywhere.com/fruit_quality?startAt=${page * rowsPerPage}&limit=${rowsPerPage}`);
        if (response.ok) {
          const jsonData = await response.json();
          const formattedData = Object.values(jsonData).map(entry => ({
            ...entry,
            dateAndTime: formatDate(entry.dateAndTime)
          }));
          setData(formattedData);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, rowsPerPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <>
          <Table aria-label="fruit quality table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Barcode</TableCell>
              <TableCell align="right">Genotype</TableCell>
              <TableCell align="right">Brix</TableCell>
              <TableCell align="right">TTA</TableCell>
              <TableCell align="right">Avg Diameter</TableCell>
              <TableCell align="right">Avg Firmness</TableCell>
              <TableCell align="right">Mass (g)</TableCell>
              <TableCell align="right">pH</TableCell>
              <TableCell align="right">Site</TableCell>
              <TableCell align="right">Block</TableCell>
              <TableCell align="right">Bush</TableCell>
              <TableCell align="right">Box</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Project</TableCell>
              <TableCell align="right">Stage</TableCell>
              <TableCell align="right">Week</TableCell>
              <TableCell align="right">Post Harvest</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.dummyCode}</TableCell>
                <TableCell align="right">{row.genotype}</TableCell>
                <TableCell align="right">{row.Brix || 'N/A'}</TableCell>
                <TableCell align="right">{row.TTA || 'N/A'}</TableCell>
                <TableCell align="right">{row.avgDiameter || 'N/A'}</TableCell>
                <TableCell align="right">{row.avgFirmness || 'N/A'}</TableCell>
                <TableCell align="right">{row.mass || 'N/A'}</TableCell>
                <TableCell align="right">{row.pH || 'N/A'}</TableCell>
                <TableCell align="right">{row.site}</TableCell>
                <TableCell align="right">{row.block}</TableCell>
                <TableCell align="right">{row.bush}</TableCell>
                <TableCell align="right">{row.box || 'N/A'}</TableCell>
                <TableCell align="right">{row.dateAndTime}</TableCell>
                <TableCell align="right">{row.notes || 'N/A'}</TableCell>
                <TableCell align="right">{row.project}</TableCell>
                <TableCell align="right">{row.stage || 'N/A'}</TableCell>
                <TableCell align="right">{row.week}</TableCell>
                <TableCell align="right">{row.postHarvest || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={-1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </TableContainer>
  );
};

export default FruitQualityTable;


