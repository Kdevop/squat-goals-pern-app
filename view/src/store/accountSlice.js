 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

 export const accountDetails = createAsyncThunk(
    'account/accountDetails', 
    async (id) => {
        try {
            const endpoint = `/api/account/${id}`;
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'Application/json'
                },
            });

            if (response.ok) {
                const json = await response.json();
                return json.data;
            } else {
                const json = await response.json();
                return rejectWithValue(json.message);
            }
        } catch (error) {
            console.error('Error getting account details: ', error);
            return rejectWithValue(error.message);
        }
    }
 );

 export const accountUpdate = createAsyncThunk(
    'account/accountUpdate',
    async (updates) => {
        const details = JSON.stringify(updates);

        try{
            const endpoint = `/api/account/update`;
            const response = await fetch(endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'Application/json'
                },
                body: details,
            });

            if(response.ok) {
                const json = await response.json();
                return json.data;
            } else {
                const json = await response.json();
                return rejectWithValue(json.message);
            }
        } catch (error) {
            console.error('Error updating account details: ', error);
            return rejectWithValue(error.message);            
        }
    }
 );

 export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        data: null, 
        isLoading: false, 
        error: false, 
        message: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(accountDetails.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(accountDetails.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = false;
                state.message = false;
            })
            .addCase(accountDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.message = action.payload;
            })
            .addCase(accountUpdate.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(accountUpdate.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.error = false;
                state.message = false;
            })
            .addCase(accountUpdate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.message = action.payload;
            })
    }
 });

 export const userAccount = (state) => state.account.data;
 export const loadingUser = (state) => state.account.isLoading;

 export default accountSlice.reducer;