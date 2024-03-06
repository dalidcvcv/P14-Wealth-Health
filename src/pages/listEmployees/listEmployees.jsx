import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import './listEmployees.css';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { removeEmployee } from '../../redux/employees';

const FilterComponent = ({ filterText, onFilter }) => {
  return (
    <div className='filter'>
      <label htmlFor="search" style={{ marginRight: '10px' }}>Search an employee:</label>
      <input
        id="search"
        type="text"
        placeholder="search"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
    </div>
  );
};

const Delete = ({ row }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeEmployee(row.id));
  };

  return (
    <FontAwesomeIcon icon={faTrashCan} style={{ cursor: 'pointer' }} onClick={handleDelete} className='icondelete'/>
  );
};


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Définition des colonnes
const columns = [
  {
    name: 'First Name',
    selector: row => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lastName,
    sortable: true
  },
  {
    name: 'Start Date',
    selector: row => formatDate(row.startDate),
    sortable: true
  },
  {
    name: 'Département',
    selector: row => row.department,
    sortable: true
  },
  {
    name: 'Date of Birth',
    selector: row => formatDate(row.dateOfBirth),
    sortable: true
  },
  {
    name: 'Street',
    selector: row => row.street,
    sortable: true
  },
  {
    name: 'City',
    selector: row => row.city,
    sortable: true
  },
  {
    name: 'State',
    selector: row => row.state,
    sortable: true
  },
  {
    name: 'Zip Code',
    selector: row => row.zipCode,
    sortable: true,
  },
  {
    name: '',
    button: true,
    cell: (row) => (
      <div>
        <Delete row={row} />
      </div>
    )
  }
]

function ListEmployees() {
  const employeesList = useSelector(state => state.employees.list);
  
  const [filterText, setFilterText] = useState('');

  const filteredData = employeesList.filter(item => {
    return item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
           item.lastName.toLowerCase().includes(filterText.toLowerCase());
  });

  const customStyles = {
    headRow: {
      style: {
        fontSize: "12px",
        fontWeight: 'bold',
      },
    },
  };
  
  return (
    <div className='tableList'>
      <h1>Current Employees</h1>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        persistTableHead
        highlightOnHover
        subHeader
        subHeaderComponent={<FilterComponent filterText={filterText} onFilter={(e) => setFilterText(e.target.value)} />}
        customStyles={customStyles}
      />
    </div>
  );
}

export default ListEmployees;

