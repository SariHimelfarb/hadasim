//react
import { observer } from "mobx-react";
import React, { useState } from "react";
//jsx
import AddVaccinationDialog from "./AddVaccination";
import MemberService from "../Service/MemberService";
import EditMemberDialog from "./EditMember";
//mui
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'; // אייקון של מחיקה
import EditIcon from '@mui/icons-material/Edit'; // אייקון של עדכון
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

import Swal from 'sweetalert2';


const Row = observer((props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openAddVaccinationDialog, setOpenAddVaccinationDialog] = useState(false);
  const [openEditMemberDialog, setOpenEditMemberDialog] = useState(false);
  //פונקציות עבור עידכון
  const handleOpenEditMemberDialog = () => {
    setOpenEditMemberDialog(true);
  };
  const handleCloseEditMemberDialog = () => {
    setOpenEditMemberDialog(false);
  };
  //פונקציות עבור הוספה
  const handleOpenAddVaccinationDialog = () => {
    setOpenAddVaccinationDialog(true);
  };

  const handleCloseAddVaccinationDialog = () => {
    setOpenAddVaccinationDialog(false);
  };


  //פונקצית מחיקה
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this member?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await MemberService.deleteMember(id);

          Swal.fire(
            'Deleted!',
            'The member has been deleted.',
            'success'
          );

        } catch (error) {
          console.error('Error deleting Member:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the member.',
            'error'
          );
        }
      }
    });
  };


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <CoronavirusIcon />}
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>

          <IconButton aria-label="edit" size="small" onClick={handleOpenEditMemberDialog}>
            <EditIcon />
          </IconButton>

          <EditMemberDialog member={row} memberId={row.id} open={openEditMemberDialog} onClose={handleCloseEditMemberDialog} />


        </TableCell>
        <TableCell component="th" scope="row">
          {row.memberId}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.city}, {row.street} {row.number}</TableCell>
        <TableCell align="right"> {row.telephone} / {row.mobilePhone}</TableCell>
        <TableCell align="right">{new Date(row.dateOfBirth).toLocaleDateString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.positive && (
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Positive Result
                  </Typography>
                  <Table size="small" aria-label="positive result">
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Positive Date</TableCell>
                        <TableCell>{new Date(row.positive).toLocaleDateString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              )}

              {row.recovery && (
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Healing Date
                  </Typography>
                  <Table size="small" aria-label="healing date">
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Healing Date</TableCell>
                        <TableCell>{new Date(row.recovery).toLocaleDateString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              )}
              <Typography variant="h6" gutterBottom component="div">
                Vaccinations
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell align="left" style={{ fontWeight: 'bold' }}>Manufacturer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.vaccinations.map((vaccinationRow, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(vaccinationRow.getting).toLocaleDateString()}</TableCell>
                      <TableCell align="left">{vaccinationRow.manufacturer.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleOpenAddVaccinationDialog} disabled={row.vaccinations.length >= 4}>
              Add Vaccination
            </Button>
            <AddVaccinationDialog memberId={row.id} open={openAddVaccinationDialog}
              onClose={handleCloseAddVaccinationDialog} />

          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
});

export default Row;
