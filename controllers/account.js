import { accountDetails, updateUserDetails } from '../model/account.js'

const userDetails = async (req, res) => {
    const {id} = req.params;

    //check that the id in the params matches the id of the session.
    if(id != req.session.passport.user) {
        return res.status(403).json({ success: false, message: 'Unauthorised access' });
    } else {
        //send to the model
        const result = await accountDetails(id);

        //manage respones from the model
        if(result.error) {
            return res.status(500).json({success: false, data: result});
        }
    
        return res.status(200).json({success: true, message: result.message, data: result.data});
    } 
}

const updateDetails = async (req, res) => {

    //get details from the body of the request
    let changes = req.body;
    const { id, email, name, password } = changes;

    //check that the id in the body matches the id of the session.
    if(id != req.session.passport.user) {
        return res.status(403).json({ success: false, message: 'Unauthorised access' });
    }

    const result = await updateUserDetails(changes);

    // responses from result
    if(result.error) {
        return res.status(500).json({ success: false, data: result });
    }

    return res.status(200).json({ success: true, message: result.message, data: result.data });

}

export { userDetails, updateDetails };