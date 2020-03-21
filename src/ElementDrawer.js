import React, {Component} from "react";
import './ElementDrawer.css';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import {TextField} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export class ElementDrawer extends Component {

    state = {
        lines : '',
        matrix: [[],[]]
    };

    handleChange = (event) => {
        event.preventDefault();
        const {value} = event.target;
        this.setState({lines: value});
    };

    handleClick = (event) => {
        event.preventDefault();
        this.build(this.state.lines);
    };

    getMaxRowNumber = (textarea) => {
        textarea = textarea.trim();
        const lines = textarea.split('\n');
        const rowsNum = lines.map(line => line.split(';')[0]);
        return Math.max(...rowsNum);
    };


    build = (textarea) => {
        const matrix = Array(this.getMaxRowNumber(textarea));
        for(let i = 0; i < matrix.length; i++){
            matrix[i] =[];
        }
        textarea = textarea.trim();
        const lines = textarea.split('\n');
        lines.forEach(line => {
          const tokens = line.split(';');
          matrix[tokens[0] - 1][tokens[1] -1] = this.buildElement(tokens[2], tokens[3], tokens.slice(4)[0].split(','));
        });
        console.log(matrix);
        this.setState({matrix: matrix});
    };


    buildElement = (label, type, values) => {
        if(type === 'TEXT_INPUT'){
            return <TextField label={label}> values[0] </TextField>;
        }
        if(type === 'SELECT'){
            return (<div>
                    <InputLabel id="label">label</InputLabel>
                    <Select labelId="label" id="select" value={values[0]}>
                        {values.map(value => <MenuItem key={value} value={value}>{value}</MenuItem> )}
                    </Select>
                </div>);
        }
    };

    componentDidMount() {
        console.log("Component Did Mount");
    }

    componentWillUnmount() {
        console.log("Component Will Unmount");
    }

    render() {
        return (
            <Grid container >
                <Grid>
                    <textarea className={'text-area'} onChange={this.handleChange}  />
                    <Button onClick={this.handleClick} disabled={this.state.lines === ''}> Build </Button>
                </Grid>
                <Table>
                    <TableBody>
                        {this.state.matrix.map((arr, i) => {
                            return (<TableRow key={i}>
                                {arr.map((element, j) => {
                                    return <TableCell key={j} >{element}</TableCell> ;
                                })}
                            </TableRow>)
                        })}
                    </TableBody>
               </Table>
            </Grid>);
    };
};
