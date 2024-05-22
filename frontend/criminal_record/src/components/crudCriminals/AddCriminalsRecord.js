import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import checkAuth from "../auth/checkAuth";
// import NavbarAdmin from "../Navbar/NavbarAdmin";

function AddCriminals() {
    const [name, setName] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [offense_description, setOffenseDescription] = useState('');
    const [victim_name, setVictimName] = useState('');
    const [case_status, setCaseStatus] = useState('');
    const [case_number,setCaseNumber] = useState();
    const [arresting_officer,setArrestingOfficer] = useState();
    const [release_date, setRelease_date] = useState('');


    
   
    const navigate = useNavigate();

    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";
  

    function addcriminal() {
        axios.post('http://127.0.0.1:8000/api/addcriminals', {
        name:name,
        date_of_birth:date_of_birth,
        gender:gender,
        offense_description:offense_description,
        victim_name:victim_name,
        case_status:case_status,
        case_number:case_number,arresting_officer,
        release_date:release_date

        }, {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            navigate('/listcriminals');
        })
        .catch(error => {
            console.error('Error adding post:', error);
        });
    }
    

    return (
        <div>

            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Add Criminals</h1>
                        <div className="form-group">
                            <label>Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of birth:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={date_of_birth} 
                                onChange={(event) => setDateOfBirth(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>gender:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={gender} 
                                onChange={(event) => setGender(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Offence description:</label>
                            <input 
                                type="text-area" 
                                className="form-control" 
                                value={offense_description} 
                                onChange={(event) => setOffenseDescription(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>victim_name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={victim_name} 
                                onChange={(event) => setVictimName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>case status:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={case_status} 
                                onChange={(event) => setCaseStatus(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>case number:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={case_number} 
                                onChange={(event) => setCaseNumber(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Arresting officer:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={arresting_officer} 
                                onChange={(event) => setArrestingOfficer(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>release date:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={release_date} 
                                onChange={(event) => setRelease_date(event.target.value)}
                            />
                        </div>
                      


                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={addcriminal}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCriminals;
