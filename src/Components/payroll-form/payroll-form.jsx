import React , { useState, useEffect} from 'react'
import profile1 from "../../assets/profile-images/Ellipse -3.png";
import profile2 from "../../assets/profile-images/Ellipse -1.png";
import profile3 from  "../../assets/profile-images/Ellipse -8.png";
import profile4 from "../../assets/profile-images/Ellipse -7.png";
import './payroll-form.css';
import logo from "../../assets/images/logo.png";
import { useParams, Link, withRouter } from 'react-router-dom';


const payrollForm = (props) => {

    let initialValue = {    
        name: "",
        profileArray:[
            { url: "../../assets/profile-images/Ellipse -3.png" },
            { url: "../../assets/profile-images/Ellipse -1.png" },
            { url: "../../assets/profile-images/Ellipse -1.png" },
            { url: "../../assets/profile-images/Ellipse -1.png" }
        ],
        allDepartment: [
            "HR", "Sales", "Finance", "Engineer", "Others"
        ],
        departmentValue: [],
        gender: "",
        salary: "",
        day: "",
        month: "",
        year: "",
        startDate: "",
        notes: "",
        id: "",
        profilrUrl: "",
        isUpdate: false,
        error: {
            department: [],
            name: "",
            gender: "",
            salary: "",
            profilrUrl: "",
            startDate: "",
        }
    }
    // const [formValue, setForm] = useState(initialValue);
    const [formValue, setForm] = useState(initialValue)

    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value})
    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);

        let checkArray = [ ...formValue.departmentValue]
        if (index > -1)
            checkArray.splice(index,1)
        else
            checkArray.push(name)
        setForm({ ...formValue, departmentValue: checkArray})
    }

    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    const validData = async () =>{
        let isError = false;
        let error = {
            department: [],
            name: "",
            gender: "",
            salary: "",
            profilrUrl: "",
            startDate: "",
        }
        if (formValue.name.length < 1){
            error.name = 'name is required field'
            isError = true
        }
        if (formValue.gender.length < 1){
            error.gender = 'gender is required field'
            isError = true
        }
        if (formValue.salary.length < 1){
            error.salary = 'salary is required field'
            isError = true
        }
        if (formValue.profilrUrl.length < 1){
            error.profilrUrl = 'profileUrl is required field'
            isError = true
        }
        if (formValue.department.length < 1){
            error.department = 'department is required field'
            isError = true
        }
    }
    const onReset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
    }
   
    return(
        <div>
            <header className="header-content header">
                <div className="logo-content">
                    <img className="../assets/images/logo.png" alt="logo"/>
                    <div>
                        <span class="emp-text">EMPLOYEE</span>
                        <span class="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className='form' method='post' onSubmit="temp">
                    <div className='form-head'>Employee Payroll form</div>
                    <div className="row-content">
                        <label className="label text">Name</label>
                        <input className='input' type='text' id='name' name='name' value={formValue.name}
                            placeholder="Your name.." required onChange={onNameChange} />
                        <error-output class="text-error" for="name"></error-output>
                    </div>
                    <div className="row-content">
                        <label lassName="label text" for="profile">Profile image</label>
                        <div lassName="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profile" value="../assets/profile-images/Ellipse -3.png" onChange={onNameChange} />                                 
                                <img className="profile" id="image1" src={profile1}/>
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="profile" value="../assets/profile-images/Ellipse -1.png" onChange={onNameChange} />                       
                                <img class="profile" id="image2" src={profile2}/>
                            </label>
                            <label>
                                <input type="radio" id="profil3" name="profile" value="../assets/profile-images/Ellipse -8.png" onChange={onNameChange} />
                                <img class="profile" id="image3" src={profile3}/>                                    
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="profile" value="../assets/profile-images/Ellipse -7.png" onChange={onNameChange} />
                                <img class="profile" id="image4" src={profile4}/>                                   
                            </label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label for="gender" className="label text">Gender</label>
                        <div>
                            <input type="radio" id="male" name="gender" value="male" onChange={onNameChange} />                             
                            <label for="male" className="text">Male</label>
                            <input type="radio" id="female" name="gender" value="female" onChange={onNameChange} />                              
                            <label for="female" class="name">Female</label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label for="department" className="label text">Department</label>
                        <div>
                            <input type="checkbox" className="checkbox" id="hr" name="department" value="HR" onChange={(e)=> onCheckChange(e)}/>                               
                            <label for="hr" className="text">HR</label>
                            <input type="checkbox" className="checkbox" id="sales" name="department" value="Sales" onChange={(e)=> onCheckChange(e)}/>  
                            <label for="sales" className="text">Sales</label>
                            <input type="checkbox" className="checkbox" id="finance" name="department" value="Finance" onChange={(e)=> onCheckChange(e)}/>                                  
                            <label for="finance" className="text">Finance</label>
                            <input type="checkbox" className="checkbox" id="engineer" name="department" value="Engineer" onChange={(e)=> onCheckChange(e)}/>                                 
                            <label for="engineer" className="text">Engineer</label>
                            <input type="checkbox" className="checkbox" id="others" name="department" value="Others" onChange={(e)=> onCheckChange(e)}/>                                 
                            <label for="others" className="text">Others</label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label for="salary" className="label text">Choose your salary: </label>                     
                        <input type="range" className="input" name="salary" id="salary" min="300000" max="500000" step="100" value="400000" onChange={onNameChange} />                           
                        <output cclassName="salary-output text" for="salary">400000</output>
                    </div>
                    <div className="row-content">
                        <label className="label text" for="startDate">Start Date</label>
                        <div>
                            <select id="day" name="Day"  onChange={onNameChange}>
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
                            <select name="Month" id="month"  onChange={onNameChange}>
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
                            <select name="Year" id="year"  onChange={onNameChange}>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                    </div>
                <div className="row-content">
                    <label for="notes" class="label text">Notes</label>
                    {/* <textarea id="notes" class="input" name="Notes" placeholder="" style="height:100px"></textarea> */}
                    <textarea id='notes' className='input' name='note' onChange={onNameChange}></textarea>     
                </div>
                <div className="buttonParent">
                    <a href="home.html" class="resetButton button cancelButton">Cancel</a>
                    <div class="submit-reset">
                        <button class="button submitButton" id="submitButton" type="submit">Submit</button>
                        <button type="reset" class="resetButton button" id="resetButton" onClick={onReset}>Reset</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )


    }
export default payrollForm
