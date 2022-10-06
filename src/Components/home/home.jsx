import React, { Component } from "react";
import "./home.css";
import profile1 from "../../assets/profile-images/Ellipse -3.png";
import profile2 from "../../assets/profile-images/Ellipse -1.png";
import profile3 from  "../../assets/profile-images/Ellipse -8.png";
import profile4 from "../../assets/profile-images/Ellipse -7.png";
import edit from "../../assets/icons/create-black-18dp.svg";
import deleteicon from "../../assets/icons/delete-black-18dp.svg";
import { withRouter, Link } from "react-router-dom";
import EmployeeService from "../../service/EmployeeService";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employee: [],
        };

    }

    fetchData() {
        EmployeeService.findAllEmployee().then((response) => {
            console.log(response.data);
            this.setState({ employee: response.data });
        });
    }
    deleteEmployee(employeeId) {
        console.log("employee id" + employeeId);
        EmployeeService.deleteEmployee(employeeId);
        window.location.reload();
    }

    componentDidMount() {
        this.fetchData();
    }
    
    updateEmployee = (employeeId) => {
        console.log(employeeId)
        this.props.history.push(`EmployeeForm/${employeeId}`);
    };


    render() {
        return (
            <div>
                <div>
                    <div className="main-content">
                        <div className="header-content employee-header">
                            <div className="emp-detail-text">
                                Employee Details
                                <div className="emp-count">{this.state.employee.length}</div>
                            </div>
                            <Link to="/employee" className="add-button">
                                <img src="" alt="" />+ Add User</Link>
                        </div>
                    </div>
                    <div className="table-main">
                        <table id="table-display" className="table">
                            <thead>
                                <tr>
                                    <th>Profile Image</th>
                                    <th>Name</th>
                                    <th>Notes</th>
                                    <th>Gender</th>
                                    <th>Department</th>
                                    <th>Salary</th>
                                    <th>Start Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.employee.map((employee, index) => (
                                    <tr key={`${index}`}>
                                        <td>
                                            <img src={employee.profilePic === "../../assets/profile-images/Ellipse -3.png" ? profile1 :
                                                employee.profilePic === "../../assets/profile-images/Ellipse -1.png" ? profile2 :
                                                    employee.profilePic === "../../assets/profile-images/Ellipse -8.png" ? profile3 : profile4
                                            } alt="ProfilePic" srcset="" /></td>
                                        <td>{employee.name}</td>
                                        <td>{employee.notes}</td>
                                        <td>{employee.gender}</td>
                                        <td>
                                            {employee.department.map(dep => <div className="dept-label" id="dept"> {dep} </div>)}
                                        </td>
                                        <td>{employee.salary}</td>
                                        <td>{employee.startDate}</td>
                                        <td>
                                            <img onClick={() => {this.deleteEmployee(employee.id) && this.fetchData() }} src={deleteicon}alt="delete"
                                                name={employee.id}/>
                                            <img onClick={() => {this.updateEmployee(employee.id)}} src={edit} name={employee.id} alt="edit" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        );
    }
}
export default withRouter(Home);