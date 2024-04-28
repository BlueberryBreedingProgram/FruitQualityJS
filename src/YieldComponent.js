import React, { useEffect, useState } from 'react';
import { TablePagination, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

function YieldComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://savaglisic2001.pythonanywhere.com/pivot_fruit_quality');
                if (response.data.length > 0) {
                    // Sort the keys for week columns and filter out Week100
                    const weekKeys = Object.keys(response.data[0]).filter(key => key.includes('Week') && key !== 'Week100').sort((a, b) => {
                        return parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10);
                    });
                    // Set the columns order: genotype, sorted weeks, TotalMass
                    setColumns(['genotype', ...weekKeys, 'TotalMass']);
                }
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    // Function to determine if the cell should be highlighted
    const shouldHighlight = (column, value) => {
        return column.includes('Week') && value === '0';
    };

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" textAlign="center">Yield by Genotype by Week</Typography>
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
        </div>
    );
}

export default YieldComponent;


