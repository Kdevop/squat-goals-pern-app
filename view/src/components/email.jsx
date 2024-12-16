import React, {useState} from 'react';
import Styles from './email.module.css';

// NOTES: THIS PAGE NEEDS SOME FORM VALIDATIONS MAKING FIELDS MANDATORY!

function Email() {
    // state for displaying sent message? Not used atm - to update later. 
    const [sent, setSent] = useState(false);

    // fucntion to manage the submiting of the email query
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // docs from web3forms say this access key is safe to use client side? howver might move to env file?  
        formData.append("access_key", "7760e893-9042-4d65-859e-9b318fe5cbb1");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // api request for web3forms. leave her or move to API foler?
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
        
        // might change this from a pop up later?
        if (res.success) {
          alert(res.message);
          
        }
      };

    return (
        <div>
            <form onSubmit={onSubmit} className={Styles.contactright}>
                <label>Your Name</label>
                <input typle='text' placeholder='Enter Your Name' name='name' />
                <label>Your Email</label>
                <input type='text' placeholder='Enter Your Email' name='email' />
                <label>Write Your Message Here</label>
                <textarea name='message' rows='8' placeholder='Enter Your Message'></textarea>
                <button className={Styles.contactSumbit} type='submit'>Submit now</button>
            </form>
        </div>
    )
};

export default Email;