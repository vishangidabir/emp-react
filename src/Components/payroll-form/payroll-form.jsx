import React , { useState, useEffect} from 'react'
import profile1 from "../../assets/profile-images/Ellipse -3.png";
import profile2 from "../../assets/profile-images/Ellipse -1.png";
import profile3 from  "../../assets/profile-images/Ellipse -8.png";
import profile4 from "../../assets/profile-images/Ellipse -7.png";
import './payroll-form.css';
import logo from "../../assets/images/logo.png";
import { useParams, Link} from 'react-router-dom';
import EmployeeService from '../../service/EmployeeService';


function EmployeeForm() {
    const allDepartment = ["HR", "Sales", "Finance", "Engineer", "Others"]

    const [formValue, setForm] = useState({
        name: "",
        profilePic: "",
        gender: "",
        department: [],
        salary: "",
        startDate: "",
        notes: "",
        isUpdate: false,
    });

    const params = useParams();
    useEffect(() => {
        console.log(params.id)
        getEmployeeId(params.id)

    }, [params.id]);
    const getEmployeeId = (employeeId) => {
        EmployeeService.findEmployee(employeeId).then((data) => {
            let obj = data.data.data;
            setData(obj)
        })

    };
    const setData = (obj) => {
        let array = obj.startDate;
        console.log(array);
        console.log(obj)
        setForm({
            ...formValue,
            ...obj,
            id: obj.id,
            name: obj.name,
            department: obj.department,
            isUpdate: true,
            day: array[8] + array[9],
            month: array[5] + array[6],
            year: array[0] + array[1] + array[2] + array[3],
            notes: obj.notes,
        });
    };
    const onCheckChange = (name) => {
        let index = formValue.department.indexOf(name);
        let checkArray = [...formValue.department];
        if (index > -1) checkArray.splice(index, 1);
        else checkArray.push(name);
        setForm({ ...formValue, department: checkArray });
    };

    const checkDepartment = (name) => {
        return formValue.department && formValue.department.includes(name);
    }
    
    const onReset = () => {
        setForm({
            name: "",
            profilePic: "",
            gender: "",
            department: [],
            salary: "",
            startDate: "",
            notes: ""
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        let employeeObject = {
            name: formValue.name,
            department: formValue.department,
            gender: formValue.gender,
            salary: formValue.salary,
            profilePic: formValue.profilePic,
            startDate: `${formValue.year}-${formValue.month}-${formValue.day}`,
            notes: formValue.notes
        };
        if (formValue.isUpdate) {
            EmployeeService.updateEmployee(params.id, employeeObject)
                .then((data) => {
                    var value = window.confirm(data);
                    if (value === true) {
                        alert("update successfull!");
                    } else {
                        window.location.reload();
                    }
                });
        } else {
            console.log(employeeObject);
            EmployeeService
                .createEmployee(employeeObject).then((response) => {
                    console.log(response);
                    alert("Data Added!!", response)
                })
        }
    }

    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }
    
    return(

        <div>
            <header className="header-content header">
                <div className="logo-content">
                    <img src={logo} alt="logo"/>
                    <div>
                        <span class="emp-text">EMPLOYEE</span>
                        <span class="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className='form' action='#' onReset="resetForm()" onSubmit={(e) => onSubmit(e) }>
                    <div className='form-head'>Employee Payroll form</div>
                    <div className="row-content">
                        <label  htmlFor="name" className="label text">Name</label>
                        <input type='text' className='input' id='name' name='name' value={formValue.name}
                            placeholder="Your name.." required onChange={onNameChange} />
                        <error-output class="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="row-content">
                        <label lassName="label text" htmlFor="profile">Profile image</label>
                        <div lassName="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profile" checked={formValue.profile === '../assets/profile-images/Ellipse -3.png'}
                                value="../assets/profile-images/Ellipse -3.png" onChange={onNameChange} />                                 
                                <img className="profile" id="image1" src={profile1} alt=""/>
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="profile" checked={formValue.profile === '../assets/profile-images/Ellipse -1.png'}
                                value="../assets/profile-images/Ellipse -1.png" onChange={onNameChange} />                       
                                <img class="profile" id="image2" src={profile2} alt=""/>
                            </label>
                            <label>
                                <input type="radio" id="profil3" name="profile" checked={formValue.profile === '../assets/profile-images/Ellipse -8.png'}
                                value="../assets/profile-images/Ellipse -8.png" onChange={onNameChange} />
                                <img class="profile" id="image3" src={profile3} alt=""/>                                    
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="profile" checked={formValue.profile === '../assets/profile-images/Ellipse -7.png'}
                                value="../assets/profile-images/Ellipse -7.png" onChange={onNameChange} />
                                <img class="profile" id="image4" src={profile4} alt=""/>                                   
                            </label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label htmlFor="gender" className="label text">Gender</label>
                        <div>
                            <input type="radio" id="male" name="gender" checked={formValue.gender === 'male'}
                            value="male" onChange={onNameChange} />                             
                            <label htmlFor="male" className="text">Male</label>
                            <input type="radio" id="female" name="gender" checked={formValue.gender === 'female'}
                            value="female" onChange={onNameChange} />                              
                            <label for="female" className="name">Female</label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">Department</label>
                        <div className="label-dep">
                            {allDepartment.map((item) => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" checked={checkDepartment(item)} onChange={() => onCheckChange(item)} value={item}/>
                                    <label className="text" htmlFor={item}>{item}</label>  
                                </span>
                            ))}
                        </div>
                    </div>
                    <br></br>
                    <div className="row-content">
                        <label htmlFor="salary" className="label text">Choose your salary: </label>                     
                        <input type="range" className="input" name="salary" id="salary" min="300000" max="500000" step="100" value={formValue.salary} defaultValue="400000" onChange={onNameChange} />                           
                        <output className="salary-output text" htmlFor="salary">{formValue.salary}</output>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select id="day" name="day"  value={formValue.day} onChange={onNameChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select name="month" id="month"  value={formValue.month} onChange={onNameChange}>
                                <option value="Jan">January</option>
                                <option value="Feb">Febuary</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                            <select name="year" id="year"  value={formValue.year} onChange={onNameChange}>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                    </div>
                <div className="row-content">
                    <label htmlFor="notes" class="label text">Notes</label>
                    <textarea id='notes' className='input' name='notes' onChange={onNameChange}></textarea>     
                </div>
                <div className="buttonParent">
                    <Link to ="/home" class="resetButton button cancelButton">Cancel</Link>
                    <div class="submit-reset">
                        <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                        <button type="reset" class="resetButton button" id="resetButton" onClick={onReset}>Reset</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default EmployeeForm;