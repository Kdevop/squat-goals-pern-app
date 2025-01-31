export const fetchSession = async () => {
    try{
        const response = await fetch('api/users/session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if(response.ok) {
            const json = await response.json();
            return json.user;
        } else {
            return null;
        }  
    } catch (error) {
        alert('error');
    }
};

export const logout = async () => {
    try {
        const response = await fetch('api/users/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if(response.ok) {
                return true;
            } else {
                return false;
            }
    } catch (e) {
        console.log(e);
    }
};

export const dashboardData = async (id) => {
    try {
        const response = await fetch(`api/dashboard/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (response.ok) { // Check if the response status is in the range 200-299
            const json = await response.json();
            return json;
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
        }
    } catch (e) {
        console.error('Fetch error:', e);
    }
};

// Need function to delete workouts
export const removeWorkout = async (details) => {
        const { id, workout } = details;
        try {
            const endpoint = `api/workouts/delete/${workout}`;
            const response = await fetch(endpoint, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify({
                    userId: id
                }),
            });

            if (response.ok) {
                const json = await response.json();
                return json;
            }
        } catch (error) {
            console.error('Error registering user ', error);
            return rejectWithValue(error.message);
        }
    };

export const getFormattedDate = () => { 
    const today = new Date();
    const month = String(today.getMonth() +1 ).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
};