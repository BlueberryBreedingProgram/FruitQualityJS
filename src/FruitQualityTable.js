import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Dialog, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TablePagination, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditFruitDialog from './EditFruitDialog';

const FruitQualityTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('dummyCode');
  const [syncing, setSyncing] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const query = `search=${encodeURIComponent(search)}&orderBy=${orderBy}&startAt=${page * rowsPerPage}&limit=${rowsPerPage}`;
    try {
      const response = await fetch(`https://savaglisic2001.pythonanywhere.com/fruit_quality?${query}`);
      if (response.ok) {
        const { data, total } = await response.json();
        setData(data);
        setTotalRows(total);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  }, [search, orderBy, page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleSearchInput = (event) => {
    if (event.key === 'Enter') {
      setSearch(event.target.value);
    }
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSyncDatabase = async () => {
    setSyncing(true);
    try {
      const response = await fetch('https://savaglisic2001.pythonanywhere.com/sync_database', {
        method: 'POST'
      });
      const result = await response.json();
      if (response.ok) {
        alert('Database synchronized successfully!');
      } else {
        throw new Error(result.error || 'Error synchronizing database.');
      }
    } catch (error) {
      alert(`Failed to sync database: ${error.message}`);
    }
    setSyncing(false);
  };

  const handleDownloadExcel = () => {
    window.location.href = 'https://savaglisic2001.pythonanywhere.com/download_fruit_quality';
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setEditDialogOpen(true);
  };

  const handleSaveSuccess = () => {
    setEditDialogOpen(false);  // Close dialog
    fetchData();  // Refresh data
  };

  const headerCells = ['Barcode', 'Genotype', 'Brix', 'TTA', 'Avg Diameter', 'Avg Firmness', 'Mass (g)', 'pH', 'Site', 'Block', 'Bush', 'Box', 'Time', 'Notes', 'Project', 'Stage', 'Week', 'Post Harvest'];

  return (
    <TableContainer component={Paper}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSyncDatabase}
          disabled={syncing}
          style={{ marginBottom: '10px' }}
        >
          {syncing ? 'Syncing...' : 'Sync Database'}
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: 'green', color: 'white', marginBottom: '10px' }}
          onClick={handleDownloadExcel}
        >
          Download Excel
        </Button>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            onKeyPress={handleSearchInput}
            style={{ marginRight: '10px' }}
          />
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel id="order-by-label">Order By</InputLabel>
            <Select
              labelId="order-by-label"
              id="order-by-select"
              value={orderBy}
              label="Order By"
              onChange={handleOrderByChange}
            >
              <MenuItem value="dateAndTime">Date</MenuItem>
              <MenuItem value="project">Project</MenuItem>
              <MenuItem value="week">Week</MenuItem>
              <MenuItem value="dummyCode">Barcode</MenuItem>
              <MenuItem value="genotype">Genotype</MenuItem>
              <MenuItem value="Brix">Brix</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {loading ? (
        <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <>
          <Table aria-label="fruit quality table" stickyHeader>
          <TableHead>
              <TableRow>
                {headerCells.map((header) => (
                  <TableCell 
                    key={header} 
                    align="right" 
                    style={{ 
                      fontWeight: 'bold', 
                      backgroundColor: '#e3f2fd' // Light blue background for each header cell
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
               <TableRow key={index} hover onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
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
          <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
            <EditFruitDialog rowData={selectedRow} onClose={() => setEditDialogOpen(false)} onSaveSuccess={handleSaveSuccess} />
          </Dialog>
          <TablePagination
            component="div"
            count={totalRows}
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


