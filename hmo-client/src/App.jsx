import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddMemberDialog from './Member/AddMember';
import AddVaccinationDialog from './Member/AddVaccination';
import Members from './Member/ShowMembers';
import { Provider } from 'mobx-react';
import './App.css'
import { Outlet } from '@mui/icons-material';
import GrafActive from './Corona/GrafActive';

function App() {

  return (

    <Router>
      <Routes >
       <Route path="/" element={<Members />} />
        <Route path="/members/*" element={<Members />} />
        <Route path="/members/add-member" element={<AddMemberDialog open={true} />} />
        <Route path="/corona" element={<GrafActive/>}/>
      </Routes >
    </Router>

  );
}

export default App
