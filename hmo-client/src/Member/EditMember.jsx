//react
import React, { useState } from 'react';
import { observer } from "mobx-react"
//jsx
import MemberService from '../Service/MemberService';
//mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Dialog } from '@mui/material';
import { TextField } from '@mui/material';


const EditMemberDialog = observer(({ member,memberId, open, onClose }) => {

    const [memberData, setMemberData] = useState({
        "name": member.name,
        "memberId": member.memberId,
        "city": member.city,
        "street": member.street,
        "number": member.number,
        "telephone": member.telephone,
        "mobilePhone": member.mobilePhone,
        "dateOfBirth": convertToDateFormat(member.dateOfBirth),
        "positive": member.positive,
        "recovery": member.recovery,
    });

    
//מכיוון שבשרת התאריך שמור כסטרינג נצרכת המרה
    function convertToDateFormat(isoDate) {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    const handleInputChange = (event) => {

    const { name, value } = event.target;
        setMemberData({ ...memberData, [name]: value });
    };


    const handleEditMember = async () => {
        console.log(memberData);

        try {
            await MemberService.putMember(memberId,memberData);
            console.log('Member editing successfully:', memberData);
            onClose();
        } catch (error) {
            console.error('Error editing member:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
 <DialogTitle>Edit Member</DialogTitle>
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
                />
                <TextField
                    margin="dense"
                    label="Member ID"
                    type="text"
                    name="memberId"
                    value={memberData.memberId}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="City"
                    type="text"
                    name="city"
                    value={memberData.city}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Street"
                    type="text"
                    name="street"
                    value={memberData.street}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Number"
                    type="text"
                    name="number"
                    value={memberData.number}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Telephone"
                    type="text"
                    name="telephone"
                    value={memberData.telephone}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Mobile Phone"
                    type="text"
                    name="mobilePhone"
                    value={memberData.mobilePhone }
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Date Of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={memberData.dateOfBirth }
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Positive"
                    type="date"
                    name="positive"
                    value={memberData.positive}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Recovery"
                    type="date"
                    name="recovery"
                    value={memberData.recovery}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />


            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleEditMember}>Edit</Button>
            </DialogActions>
        </Dialog>
    );
});


export default EditMemberDialog;