import React, { useState } from 'react';
import './UserForm.css';
import userimage from '../assets/user-image.png';

const UserForm = () => {
    const [isYesChecked, setIsYesChecked] = useState(false);
    const [isNoChecked, setIsNoChecked] = useState(false);
    const [isSubFormYesChecked, setIsSubFormYesChecked] = useState(false);
    const [isSubFormNoChecked, setIsSubFormNoChecked] = useState(false);

    const handleYesChange = (event) => {
        setIsYesChecked(event.target.checked);
        if (event.target.checked) {
            setIsNoChecked(false);
        }
    };

    const handleNoChange = (event) => {
        setIsNoChecked(event.target.checked);
        if (event.target.checked) {
            setIsYesChecked(false);
        }
    };

    const handleSubFormYesChange = (event) => {
        setIsSubFormYesChecked(event.target.checked);
        if (event.target.checked) {
            setIsSubFormNoChecked(false);
        }
    };

    const handleSubFormNoChange = (event) => {
        setIsSubFormNoChecked(event.target.checked);
        if (event.target.checked) {
            setIsSubFormYesChecked(false);
        }
    };

    return (
        <>
        <div className="title">
                <h4>Student Registration Form</h4>
        </div>
        <div className="main-container">

            <div className='container'>
        
                <div className="descp">
                    <label>Are you willing to Attend ?</label>
                </div>
                <div className="checkboxes">
                    <label><input type="checkbox" checked={isYesChecked} onChange={handleYesChange} id="cb"/>Yes</label>
                    <label><input type="checkbox" checked={isNoChecked} onChange={handleNoChange} id="cb"/>No</label>
                </div>

                {isYesChecked && (
                    <form action="">
                        <div class="input-container">
                            <input type="text" placeholder="Hall Ticket No"/>
                        </div>
                        <div className="column-container">
                            <b>Name</b>
                        </div>
                        <div className="column-container">
                            <img src={userimage} alt="" style={{ width: '75px', height: '75px' }} />
                        </div>
                        <div className="descp">
                            <label>Persons accompanying for the graduation fill the form :</label>
                        </div>
                        <div className="checkboxes">
                            <label><input type="checkbox" checked={isSubFormYesChecked} onChange={handleSubFormYesChange} id="cb"/>Yes</label>
                            <label><input type="checkbox" checked={isSubFormNoChecked} onChange={handleSubFormNoChange} id="cb"/>No</label>
                        </div>
                    </form>
                )}
                
                {isSubFormYesChecked && (
                    <form action="">
                    <div className="subform">
                        <div className="row-container">

                            <div className="sub-container">
                                <input type="text" placeholder='Name'/>
                                <input type="text" placeholder='Relation'/>
                                <input type="file" />
                            </div>

                            <div className="sub-container">
                                <input type="text" placeholder='Name'/>
                                <input type="text" placeholder='Relation'/>
                                <input type="file" />
                            </div>

                            <div className="submit-btn">
                                <button type='submit'>Submit</button>
                            </div>
                        </div>
                    </div>
                    </form>
                )}

            </div>
        </div>
        </>
    );
};

export default UserForm;
