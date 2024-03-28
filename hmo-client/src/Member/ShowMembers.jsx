//react
import React,{ useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useNavigate } from 'react-router';
//jsx
import memberService from "../Service/MemberService";
import Row from "./Row";
//mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from "@mui/material";





const Members = observer(() => { 
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const membersData = await memberService.getMember();
      setRows(membersData); // להגדיר את השורות
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleOpenAddMemberDialog = () => {
navigate('/members/add-member');
};


  return (
<div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>Address</TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>Contact</TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>Date Of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>

    
    </TableContainer>
    <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleOpenAddMemberDialog}>
     Add Member
   </Button>


     </div>
  );

});

export default Members;

