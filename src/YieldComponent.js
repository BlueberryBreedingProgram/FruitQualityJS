import React, { useEffect, useState } from 'react';
import { TablePagination, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

function YieldComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async (currentPage, currentRowsPerPage, currentSearchTerm) => {
        setLoading(true);
        try {
            const response = await axios.get('https://savaglisic2001.pythonanywhere.com/pivot_fruit_quality', {
                params: {
                    page: currentPage + 1, // Because the API is 1-indexed for pages
                    pageSize: currentRowsPerPage,
                    search: currentSearchTerm,
                },
            });
            setData(response.data.data);
            setTotalRows(response.data.total);
            // Extract and order column names from the first item if data exists
            if (response.data.data.length > 0) {
                const firstRow = response.data.data[0];
                const weekColumns = Object.keys(firstRow)
                    .filter(key => key.includes('Week') && key !== 'TotalMass' && key !== 'genotype')
                    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
                setColumns(['genotype', ...weekColumns, 'TotalMass']);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };    

    useEffect(() => {
        fetchData(page, rowsPerPage, '');
    }, [page, rowsPerPage]);

    // Pagination change handler
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0); // Reset to the first page with the new search
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // New function to handle Enter key press for search
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setPage(0); // Reset to the first page with the new search
            fetchData(0, rowsPerPage, searchTerm);
        }
    };

    // Function to determine if the cell should be highlighted
    const shouldHighlight = (column, value) => {
        return column.includes('Week') && value === '0';
    };

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" textAlign="center">Yield by Genotype by Week</Typography>
            <TextField
                label="Search by Genotype"
                variant="outlined"
                style={{ marginBottom: 20 }}
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((key) => (
                                <TableCell key={key}>{key}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column, cellIndex) => (
                                    <TableCell
                                        key={cellIndex}
                                        style={shouldHighlight(column, row[column]) ? { backgroundColor: 'yellow' } : {}}
                                    >
                                        {row[column]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default YieldComponent;



