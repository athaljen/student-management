import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Student {
  id: string;
  roll: number;
  name: string;
  dob: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    updateStudent: (
      state,
      action: PayloadAction<{ id: string; updatedData: Student }>
    ) => {
      const { id, updatedData } = action.payload;
      const index = state.students.findIndex((student) => student.id === id);
      if (index !== -1) {
        state.students[index] = updatedData;
      }
    },
    deleteStudent: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.students = state.students.filter((student) => student.id !== id);
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } =
  studentSlice.actions;
export const studentSelector = (state: RootState) => state.students.students;
export default studentSlice.reducer;
