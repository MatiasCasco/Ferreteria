import React, {useState, forwardRef} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, startOfToday } from 'date-fns';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const ListSelect = ({ title, list, value, onChange, inputLabelStyle, selectStyle }) => (
  <FormControl fullWidth>
    <InputLabel style={inputLabelStyle || { color: 'black' }}>{title}</InputLabel>
    <Box sx={{ mt: 2 }}/>
    <Select
      value={value}
      onChange={onChange}
      style={selectStyle || {
        color: 'black',
        border: '1px solid black',
      }}
      sx={{height: '35px'}}
    >
      <MenuItem value="" disabled>Selecciona un {title}</MenuItem>
      {list.map((item, index) => (
        <MenuItem key={index} value={item.descripcion}>
          {item.descripcion}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const ViewRucSelect = ({ title, ruc, inputLabelStyle, selectStyle }) => {

    return (
      <div>
        <InputLabel style={inputLabelStyle || { color: 'black' }}>{title}</InputLabel>
        <TextField
          value={ruc}
          // disabled
          fullWidth
          style={selectStyle || {
            color: 'black',
            border: '1px solid black',
          }}
        />
      </div>
    );
}

const CustomInputDatePicker = forwardRef(({ value, onClick, label }, ref) => {
  return (
    <TextField
      variant="outlined"
      onClick={onClick}
      value={value}
      label={label}
      inputRef={ref}
      InputProps={{
        endAdornment: (
          <IconButton disabled>
            <CalendarTodayIcon style={{color: 'black'}}/>
          </IconButton>
        ),
        style: { height: '40px' },
      }}
      style={{ fontSize: '8px', lineHeight: '1.5' }}
    />
  );
});




export const FechaSelect = ({title ,selected, onChange, message, style}) => {

    return(
      <div className="date-picker-container" style={style} >
        <InputLabel style={{ color: 'black' }}>{title}</InputLabel>
        <Box sx={{mt:1}}/>
        <DatePicker
          selected={selected}
          onChange={onChange}
          customInput={<CustomInputDatePicker label={message} />}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    );
}

