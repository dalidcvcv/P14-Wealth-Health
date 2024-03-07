import React, { useState } from 'react'
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../../redux/employees'
import 'react-datepicker/dist/react-datepicker.css'
import Modal from '@dalidcvcv/oc-p14-modal';
import './AddEmployees.css'

function AddEmployees () {
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
  })

  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [employeeName, setEmployeeName] = useState('')
  const [employeeLastName, setEmployeeLastName] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setEmployee({ ...employee, [name]: value })
  }

  // Fonction pour gérer les changements spécifiques à ReactSelect
  const handleSelectChange = (selectedOption, action) => {
    console.log(`Option sélectionnée pour ${action.name} :`, selectedOption)
    setEmployee({
      ...employee,
      [action.name]: selectedOption ? selectedOption.value : ''
    })
  }

  // Fonctions spécifiques pour gérer les changements de DatePicker
  const handleDateChange = (date, field) => {
    console.log(`Date mise à jour pour ${field} :`, date)
    setEmployee({ ...employee, [field]: date })
  }

  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'street',
      'city',
      'state',
      'zipCode',
      'department',
      'dateOfBirth',
      'startDate'
    ]

    for (const field of requiredFields) {
      if (!employee[field]) {
        alert(`Please fill out the ${field} field.`)
        return false // Arrête la validation si un champ requis est vide
      }
    }
    if (!employee.dateOfBirth) {
      alert('Veuillez sélectionner une date de naissance.')
      return false
    }

    if (!employee.startDate) {
      alert('Veuillez sélectionner une date de début.')
      return false
    }
    return true
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Validation du formulaire avant la soumission
    if (!validateForm()) {
      return
    }

    // Construction des données de l'employé pour la soumission
    const employeeToSubmit = {
      ...employee, // Copie toutes les propriétés de l'objet 'employee' 
      dateOfBirth: employee.dateOfBirth
        ? employee.dateOfBirth.toISOString().slice(0, 10)// Convertit 'dateOfBirth' au format 'YYYY-MM-DD' si définie
        : null,
      startDate: employee.startDate
        ? employee.startDate.toISOString().slice(0, 10)// Convertit 'startDate' au format 'YYYY-MM-DD' si définie
        : null
    }

    // Soumission des données saisies
    dispatch(addEmployee(employeeToSubmit))

    // Réinitialisation de l'état du formulaire
    setEmployee({ firstName: '', lastName: '', dateOfBirth: null, startDate: null, street: '', city: '', state: '', zipCode: '', department: '' });

    // Ouverture de la modale.
    setEmployeeName(employee.firstName)
    setEmployeeLastName(employee.lastName)
    setIsModalOpen(true)
  }

  return (
    <div className='container'>
      <h1>Create Employee</h1>
      <EmployeeForm 
        employee={employee} 
        handleChange={handleChange} 
        handleSelectChange={handleSelectChange} 
        handleDateChange={handleDateChange} 
        handleSubmit={handleSubmit} 
      />
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={ `The employee ${employeeName} ${employeeLastName} has been successfully created!`} 
      />
    </div>
  );
}

export default AddEmployees
