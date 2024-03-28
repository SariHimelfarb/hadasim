//react
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { observer } from "mobx-react";
//jsx
import MemberService from '../Service/MemberService';
//mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


const AddMemberDialog = observer(({ open }) => {
    //שמירת הנתונים להוספה כאן
    const [memberData, setMemberData] = useState({
        "name": '',
        "memberId": '',
        "city": '',
        "street": '',
        "number": '',
        "telephone": '',
        "mobilePhone": '',
        "dateOfBirth": '',
        "positive": '',
        "recovery": ''
    });

    const [errors, setErrors] = useState({});
//בכל מקרה של שינוי התיבות קלט הפונקציה הזאת משנה בusrState
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMemberData({ ...memberData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const navigate = useNavigate();
    const onClose = () => {
        navigate('/members');
    };
//ההוספה לטבלה דרך השרת
    const handleAddMember = async () => {
        const errors = validateMemberData(memberData);
        if (Object.keys(errors).length === 0) {
            try {
                await MemberService.postMember(memberData);
                console.log('Member added successfully:', memberData);
                onClose();
            } catch (error) {
                console.error('Error adding member:', error);
            }
        } else {
            setErrors(errors);
        }
    };
//בדיקות ולידציה
    const validateMemberData = (data) => {
        const errors = {};

        if (!data.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!data.memberId.trim()) {
            errors.memberId = 'Member ID is required';
        }

        if (!data.street.trim()) {
            errors.street = 'Street is required';
        }

        if (!data.number.trim()) {
            errors.number = 'Number is required';
        }

        if (!data.city.trim()) {
            errors.city = 'City is required';
        }

        if (!data.telephone.trim()) {
            errors.telephone = 'Telephone is required';
        } else if (!isPhoneValid(data.telephone)) {
            errors.telephone = 'Invalid phone number';
        }

        if (!data.mobilePhone.trim()) {
            errors.mobilePhone = 'Mobile phone is required';
        } else if (!isPhoneValid(data.mobilePhone)) {
            errors.mobilePhone = 'Invalid mobile phone number';
        }

        if (!data.dateOfBirth.trim()) {
            errors.dateOfBirth = 'Date of birth is required';
        }

        if (data.positive.trim() && !isDateValid(data.positive)) {
            errors.positive = 'Invalid date format (dd/mm/yyyy)';
        }

        if (data.recovery.trim() && !isDateValid(data.recovery)) {
            errors.recovery = 'Invalid date format (dd/mm/yyyy)';
        }

        return errors;
    };

    const isDateValid = (dateString) => {
        if (!dateString) return true;
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(dateString)) return false;
        const [dd, mm, yyyy] = dateString.split('/');
        const dateObj = new Date(`${mm}/${dd}/${yyyy}`);
        return !isNaN(dateObj.getTime());
    };

    const isPhoneValid = (phone) => {
        return /^[0-9]{10}$/.test(phone);
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Add Member</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    name="name"
                    value={memberData.name}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    margin="dense"
                    label="Member ID"
                    type="text"
                    name="memberId"
                    value={memberData.memberId}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.memberId}
                    helperText={errors.memberId}
                />
                <TextField
                    margin="dense"
                    label="City"
                    type="text"
                    name="city"
                    value={memberData.city}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city}
                />
                <TextField
                    margin="dense"
                    label="Street"
                    type="text"
                    name="street"
                    value={memberData.street}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.street}
                    helperText={errors.street}
                />
                <TextField
                    margin="dense"
                    label="Number"
                    type="text"
                    name="number"
                    value={memberData.number}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.number}
                    helperText={errors.number}
                />
                <TextField
                    margin="dense"
                    label="Telephone"
                    type="text"
                    name="telephone"
                    value={memberData.telephone}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.telephone}
                    helperText={errors.telephone}
                />
                <TextField
                    margin="dense"
                    label="Mobile Phone"
                    type="text"
                    name="mobilePhone"
                    value={memberData.mobilePhone}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.mobilePhone}
                    helperText={errors.mobilePhone}
                />
                <TextField
                    margin="dense"
                    label="Date Of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={memberData.dateOfBirth}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth}
                />
                <TextField
                    margin="dense"
                    label="Positive"
                    type="date"
                    name="positive"
                    value={memberData.positive}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.positive}
                    helperText={errors.positive}
                />
                <TextField
                    margin="dense"
                    label="Recovery"
                    type="date"
                    name="recovery"
                    value={memberData.recovery}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.recovery}
                    helperText={errors.recovery}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddMember}>Add</Button>
            </DialogActions>
        </Dialog>
    );
});

export default AddMemberDialog;
