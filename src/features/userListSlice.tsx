import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as apiClient from '../app/api/apiClient'

export type User= {
    id: number;
    title: string;
    body: string;
    name: {
        first: string;
    };
    picture: {
        thumbnail: string;
    }
}
const initialState: UserListState = {
    users: [],
    loading: false,
    error : true,
    nexPage: 1,
}
export type UserListState = {
    users: User[];
    loading: boolean;
    error: boolean;
    nexPage: number;
};


export const fetchUsers = createAsyncThunk<{users: User[]}, {page: number}>(
    'fetchUsers', async ({page}) => {
        const response = await apiClient.fetchUsers(page,10);
        if (response.kind === 'success') {
            return {
                users: response.body ?? [],
            };
        }else {
            throw 'Error fetching users';
        }
    });


const userListSlice = createSlice({
    name: "userList",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = false; 
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.nexPage += 1;
            state.users = state.users.concat(action.payload.users);
            state.loading = false;
        })
        .addCase(fetchUsers.rejected, (state) => {
            state.error = true;
            state.loading = false;
        })
    },
    });
export default userListSlice.reducer;









