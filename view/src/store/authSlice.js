// store for user
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        const { username, password } = credentials;
        try {
            const endpoint = `/api/users/signin`;
            const response = await fetch(endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            if (response.ok) {
                const json = await response.json();
                return json.user;
            } else {
                const json = await response.json();
                return rejectWithValue(json.message);
            }

        } catch (error) {
            console.error('Error loggin in user ', error);
            return rejectWithValue(error.message);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (credentials) => {
        const { password, email, name } = credentials;
        try {
            const endpoint = `/api/users/register`;
            const response = await fetch(endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    password,
                    email,
                    name
                }),
            });

            if (response.ok) {
                const json = await response.json();
                return json.userId;
            } else {
                const json = await response.json();
                return rejectWithValue(json.message);
            }


        } catch (error) {
            console.error('Error registering user ', error);
            return rejectWithValue(error.message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: false,
        message: false
    },
    reducers: {
        logOutUser: (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.error = false;
            state.message = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = false;
                state.message = false
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.message = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = false;
                state.message = false
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.message = action.payload;
            })
    }
});

export const { logOutUser, setUser } = authSlice.actions;
export const isLoadingUser = (state) => state.auth.isLoading;
export const user = (state) => state.auth.user;

export default authSlice.reducer;