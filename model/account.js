import pool from '../model/database.js';
import bcrypt from 'bcrypt';

//return account details.
const accountDetails = async (userId) => {
    //query for database.
    const query = 'SELECT id, email, account, name FROM user_customer WHERE id = $1';

    //query the database
    try{
        const result = await pool.query(query, [userId]);
        if(result.rows.length === 0) {
            return {error: true, message: 'No user details returned.',data: result.data};
        } 
        return { error: false, data: result.rows[0] };
    } catch (error) {
        console.error({ message: 'Error collecting user details: ', error });
        return { error: true, message: error.message };
    }
};

//update account details.
const updateUserDetails = async (changes) => {
    const { id, email, name, password } = changes;

    //identify the fields be to changed
    let fields = [];
    let values = [];

    if(changes.email) {
        fields.push('email');
        values.push(email);
    }

    if(changes.name) {
        fields.push('name');
        values.push(name);
    }

    if(changes.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        fields.push('password');
        values.push(hash);
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

    //If nothing to update return error.
    if(fields.length === 0) {
        return { error: true, message: 'Nothing to update' };
    } else {
        try{ 
            //Query the database to change details
            const query = `Update user_customer SET ${setClause} WHERE id = $${fields.length + 1} RETURNING id, email, name`;

            const updates = await pool.query(query, [...values, id]);

            //manage response from the database
            if(updates.rows.length === 0) {
                return { error: true, message: 'Error collecting changes' };
            }

            return { error: false, message: 'Details updated', data: updates.rows[0] };
        } catch (error) {
            return { error: true, message: error.message }
        }
    }
};

export { accountDetails, updateUserDetails };