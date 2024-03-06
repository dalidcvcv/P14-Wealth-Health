import { createSlice } from '@reduxjs/toolkit';

const employeesSlice = createSlice({
  name: 'employees',
  initialState: { list: [] },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
    removeEmployee: (state, action) => {
      const index = state.list.findIndex(employee => employee.id === action.payload);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
  },
});

export const { addEmployee, removeEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
