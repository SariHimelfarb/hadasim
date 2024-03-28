//react
import React, { useState , useEffect} from 'react';
import { observer } from "mobx-react";
//jsx
import VaccinationService from '../Service/VaccinationService';
import ManufacturerService from '../Service/ManufacturerService';
//mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const AddVaccinationDialog = observer(({ memberId, open, onClose}) => {
        //שמירת הנתונים להוספה כאן
    const [vaccinationData, setVaccinationData] = useState({
        manufacturerId: '',
        getting: '',       
        memberId:memberId
    });

    const [manufacturers, setManufacturers] = useState([]); //לקבל את רשימת היצרנים
    useEffect(() => {
      const fetchData = async () => {
        const manufacturersData = await ManufacturerService.getManufacturer();
        setManufacturers(manufacturersData); 
      };
  
      fetchData();
      
    }, []);

    const [errors, setErrors] = useState({});

    const handleDateChange = (event) => {
        setVaccinationData({ ...vaccinationData, getting: event.target.value });
    };

    const handleManufacturerChange = (event) => {
        setVaccinationData({ ...vaccinationData, manufacturerId: event.target.value });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        // בדיקת תאריך
        if (!vaccinationData.getting) {
            newErrors.date = 'Date is required';
            valid = false;
        }

        // בדיקת יצרן
        if (!vaccinationData.manufacturerId) {
            newErrors.manufacturerId = 'Manufacturer is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };
//הוספת החיסון לטבלה דרך השרת
    const handleAddVaccination = async () => {
        if (validateForm()) {
            try {
                await VaccinationService.postVaccination(vaccinationData);
                console.log('Vaccination added successfully:', vaccinationData);
                onClose();
            } catch (error) {
                console.error('Error adding vaccination:', error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Vaccination</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Date"
                    type="date"
                    value={vaccinationData.getting}
                    onChange={handleDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    error={!!errors.date}
                    helperText={errors.date}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} error={!!errors.manufacturerId}>
                    <InputLabel id="demo-select-small-label">Manufacturer</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={vaccinationData.manufacturerId}
                        onChange={handleManufacturerChange}
                        label="Manufacturer"
                    >
                        {manufacturers.map((manufacturer, index) => (
                            <MenuItem key={index} value={manufacturer.id}>{manufacturer.name}</MenuItem>
                        ))}
                    </Select>
                    {!!errors.manufacturerId && <div>{errors.manufacturerId}</div>}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddVaccination}>Add</Button>
            </DialogActions>
        </Dialog>
    );
});

export default AddVaccinationDialog;
