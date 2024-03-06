import React from 'react';
import DatePicker from 'react-datepicker';
import ReactSelect from "react-select";
import { states, departments } from '../../data/data';

function EmployeeForm({ employee, handleChange, handleSelectChange, handleDateChange, handleSubmit }) {
    // Définition des options pour les sélecteurs.
  const stateOptions = states.map(state => ({
    value: state.abbreviation,
    label: state.name
  }));

  const departmentOptions = departments.map(department => ({
    value: department,
    label: department
  }));

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <label>First Name<input type='text' name='firstName' value={employee.firstName} onChange={handleChange} /></label>
      <label>Last Name<input type='text' name='lastName' value={employee.lastName} onChange={handleChange} /></label>
      <label>Date of Birth
        <DatePicker
          selected={employee.dateOfBirth}
          onChange={(date) => handleDateChange(date, 'dateOfBirth')}
          dateFormat="yyyy-MM-dd"
          className="datepicker-input"
          placeholderText="Select a date"
        />
      </label>
      <label>Start Date
        <DatePicker
          selected={employee.startDate}
          onChange={(date) => handleDateChange(date, 'startDate')}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15}
          dateFormat="yyyy-MM-dd"
          className="datepicker-input"
          placeholderText="Select a date"
        />
      </label>
      <fieldset>
        <legend>Address</legend>
        <label>Street<input type='text' name='street' value={employee.street} onChange={handleChange} /></label>
        <label>City<input type='text' name='city' value={employee.city} onChange={handleChange} /></label>
        <label>State
        <ReactSelect
          name='state'
          value={stateOptions.find(option => option.value === employee.state) || ''}
          onChange={handleSelectChange}
          options={stateOptions}
          placeholder="Select a State"
          isClearable={true}
          className='dropdown'
        />
      </label>
        <label>Zip Code<input type='number' name='zipCode' value={employee.zipCode} onChange={handleChange} /></label>
      </fieldset>
      <label>Department
        <ReactSelect
          name='department'
          value={departmentOptions.find(option => option.value === employee.department) || ''}
          onChange={handleSelectChange}
          options={departmentOptions}
          placeholder="Select a Department"
          isClearable={true}
          className="dropdown"
        />
      </label>
      <button type='submit' className='submit-btn'>Save</button>
    </form>
  );
}

export default EmployeeForm;
