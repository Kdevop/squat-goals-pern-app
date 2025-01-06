// store for exercises
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// get users workouts workouts
export const getUserWorkouts = createAsyncThunk(
    'workouts/getUserWorkouts',
    async (details, {rejectWithValue}) => {
        const { date, id } = details;
        try {
            const endpoint = `/api/workouts/${date}/${id}`;
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'Application/json'
                }
            });

            if (response.ok) {
                const json = await response.json();
                return json.data;
            } else {
                const json = await response.json();
                return rejectWithValue(json.message);
            }
        } catch (error) {
            console.error('Error collecting user Workouts: ', error);
            return rejectWithValue(error.message);
        }
    }
);

// need function to add workout
export const addWorkouts = createAsyncThunk(
    'workouts/addWorkouts',
    async (updates, {rejectWithValue}) => {
        const { exercise_id, sets, reps, weight, duration, user_customer_id, date } = updates;
        try {
            const endpoint = `/api/workouts/add`;
            const response = await fetch(endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    exercise_id,
                    sets,
                    reps,
                    weight,
                    duration,
                    user_customer_id,
                    date
                }),
            });

            if (response.ok) {
                const json = await response.json();
                return json.data;
            } else {
                const json = await response.json();
                return rejectWithValue(json.message);
            }

        } catch (error) {
            console.error('Error registering user ', error);
            return rejectWithValue(error.message);
        }
    });


export const workoutSlice = createSlice({
    name: 'workouts',
    initialState: {
        isLoading: false,
        error: false,
        data: [],
        message: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserWorkouts.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getUserWorkouts.fulfilled, (state, action) => {
                state.data = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
                state.error = false;
                state.message = false;
            })
            .addCase(getUserWorkouts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.message = action.payload;
            })
            .addCase(addWorkouts.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(addWorkouts.fulfilled, (state, action) => {
                state.data = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
                state.error = false;
                state.message = false;
            })
            .addCase(addWorkouts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.message = action.payload;
            })
    }
});

export const userWorkouts = (state) => state.workouts.data;
export default workoutSlice.reducer;