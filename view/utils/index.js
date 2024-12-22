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
}