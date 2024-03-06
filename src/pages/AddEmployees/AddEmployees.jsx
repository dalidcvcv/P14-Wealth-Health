import React, { useState } from 'react';
import { states, departments } from '../../data/data';
import DatePicker from 'react-datepicker';
import ReactSelect from "react-select";
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/employees';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '../../components/Modal/Modal';
import './AddEmployees.css';

function AddEmployees() {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null, 
    startDate: null, 
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: ''
  });

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeLastName, setEmployeeLastName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Fonction pour gérer les changements spécifiques à ReactSelect
  const handleSelectChange = (selectedOption, action) => {
    console.log(`Option sélectionnée pour ${action.name} :`, selectedOption);
    setEmployee({ ...employee, [action.name]: selectedOption ? selectedOption.value : '' });
  };
  // Définir les options pour les sélecteurs d'états et de départements
  const stateOptions = states.map(state => ({
    value: state.abbreviation,
    label: state.name
  }));

  const departmentOptions = departments.map(department => ({
    value: department,
    label: department
  }));
  
  // Fonctions spécifiques pour gérer les changements de DatePicker
  const handleDateChange = (date, field) => {
    console.log(`Date mise à jour pour ${field} :`, date);
    setEmployee({ ...employee, [field]: date });
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'street', 'city', 'state', 'zipCode', 'department'];
    
    for (const field of requiredFields) {
      if (!employee[field]) {
        alert(`Please fill out the ${field} field.`);
        return false; // Arrête la validation si un champ requis est vide
      }
    }
  
    return true; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation du formulaire avant la soumission
    if (!validateForm()) {
      return;
    }
  
    // Préparation des données de l'employé pour la soumission
    const employeeToSubmit = {
      ...employee,
      dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.toISOString().slice(0, 10) : null,
      startDate: employee.startDate ? employee.startDate.toISOString().slice(0, 10) : null,
    };
  
    // Soumission des données de l'employé
    dispatch(addEmployee(employeeToSubmit));
  
    // Réinitialisation de l'état du formulaire
    setEmployee({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      startDate: null,
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: ''
    });
  
    // Ouvrir la modale pour informer l'utilisateur de la réussite de la soumission
    setEmployeeName(employee.firstName);
    setEmployeeLastName(employee.lastName);
    setIsModalOpen(true);
  };
  
  return (
    <div className='container'>
      <h1>Create Employee</h1>
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
            value={stateOptions.find(option => option.value === employee.state)}
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
            value={departmentOptions.find(option => option.value === employee.department)}
            onChange={handleSelectChange}
            options={departmentOptions}
            placeholder="Select a Department"
            isClearable={true}
            className="dropdown"
          />
        </label>
        <button className='submit-btn' type='submit'>Save</button>
      </form>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        employeeName={employeeName}
        employeeLastName={employeeLastName}
      />
    </div>
  );
}

export default AddEmployees;
