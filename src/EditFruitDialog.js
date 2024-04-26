import React, { useState, useEffect } from 'react';
import { DialogContent, DialogTitle, TextField, Button, DialogActions } from '@mui/material';

const EditFruitDialog = ({ rowData, onClose, onSaveSuccess }) => {
  const [formData, setFormData] = useState(rowData || {});

  useEffect(() => {
    setFormData(rowData); // Update form data when rowData changes
  }, [rowData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const response = await fetch(`https://savaglisic2001.pythonanywhere.com/update_fruit_quality/${formData.dummyCode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      onSaveSuccess();  // Call the callback to refresh data
      onClose(); // Close dialog on successful save
    } else {
      const error = await response.json();
      alert(`Failed to update: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <>
      <DialogTitle>Edit Fruit Record</DialogTitle>
      <DialogContent>
        {Object.keys(formData).map((key) => (
          <TextField
            key={key}
            margin="dense"
            label={key}
            type="text"
            fullWidth
            variant="outlined"
            name={key}
            value={formData[key] || ''}
            onChange={handleChange}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </>
  );
};

export default EditFruitDialog;

