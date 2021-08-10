import './App.css';

import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export class App extends React.Component {
  

  state = {
    persons: []
  }
//Obtenemos los Datos del Api - Get de todos los Espacios 
  componentDidMount() {
    axios.get(`http://localhost:4000/api/spaces`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    
      return (<TableContainer component={Paper}>
        <Table aria-label="caption table">
          
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">State</TableCell>
              <TableCell align="left">Number</TableCell>
              <TableCell align="left">Parking</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.persons.map(person => (
              <TableRow key={person.id}>
                <TableCell component="th" scope="row">
                  {person.id}
                </TableCell>
                <TableCell align="left">{person.state}</TableCell>
                <TableCell align="left">{person.number}</TableCell>
                <TableCell align="left">{person.parking}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
