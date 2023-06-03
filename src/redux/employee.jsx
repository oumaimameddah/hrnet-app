import { createAction, createReducer } from "@reduxjs/toolkit";

export const initialStateOfList = {
	list: []
};

export const addEmployeeLoListAction = createAction("employee/add");

export default createReducer(initialStateOfList, (builder) =>
	builder.addCase(addEmployeeLoListAction, (draft, action) => {
		draft.list = [...draft.list, action.payload];
	})
);
