import '../styles/create-employe.style.scss'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "../hooks/useForm";
import {departments, states} from "../hooks/api";
import ReactModal from "oum-react-modal";
import ReactSelect from "oum-react-select";
import "oum-react-select/dist/index.css"
import "oum-react-modal/dist/index.css"


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch, useSelector} from "react-redux";

import {addEmployeeLoListAction} from "../redux/employee";
import {selectEmployeeList} from "../hooks/use.utilitises";

const CreateEmployee = () => {

    useEffect(() => {
        document.title = "HRnet | Create Employee"; // to change page title
    }, []);

    const dispatch = useDispatch();

    const employees = useSelector(selectEmployeeList());

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [showExistModal, setExistModal] = useState(false);

    const navigate = useNavigate(); // to navigate to other page

    const {
        handleSubmit,
        handleChange,
        data
    } = useForm({
        default: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            startDate: "",
            department: departments[0],
            street: "",
            city: "",
            state: states[0].value,
            zip: "",
        },
        handleSubmit: () => {
            const employee = {
                firstName: data.firstName,
                lastName: data.lastName,
                dateOfBirth: sanitizeDate(data.dateOfBirth),
                startDate: sanitizeDate(data.startDate),
                department: data.department,
                street: data.street,
                city: data.city,
                state: data.state,
                zipCode: data.zip,
            };
            if (employees.find(el =>
                el.firstName === employee.firstName &&
                el.lastName === employee.lastName &&
                el.dateOfBirth === employee.dateOfBirth &&
                el.startDate === employee.startDate &&
                el.department === employee.department &&
                el.street === employee.street &&
                el.city === employee.city &&
                el.state === employee.state &&
                el.zipCode === employee.zipCode) === undefined)
            {
                dispatch(addEmployeeLoListAction(employee));
                setShowConfirmationModal(true);
            } else {
                setExistModal(true);
            }
        }
    })

    const sanitizeDate = (value) => {
        let d = new Date(value);
        return '' + (d.getUTCMonth() + 1) + '-' + (d.getUTCDate() + 1) + '-' + d.getUTCFullYear();
    }


    return (
        <>
            <main className="employee-container">
                <div className="title">
                    <h1>HRnet</h1>
                </div>
                <div className="form-setion">
                    <button onClick={() => navigate("/employee-list")} aria-label="Navigate to employee list page" type="button" className="btn btn-success btn-view-employee">View Current Employees</button>

                    <h2 className="title-create-employee">Create Employee form</h2>

                    <form
                        id="create-employee"
                        onSubmit={handleSubmit}
                        className={'needs-validation'}
                    >
                        <div className="mb-3">
                            <label className="form-label" htmlFor="first-name">First Name</label>
                            <input className="form-control" type="text" id="first-name" onChange={e => handleChange(e, "firstName")} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="last-name">Last Name</label>
                            <input className="form-control" type="text" id="last-name" onChange={e => handleChange(e, "lastName")} required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="date-of-birth">Date of Birth</label>
                            <DatePicker className="form-control" id="date-of-birth"  selected={data.dateOfBirth} onChange={e => handleChange(e, "dateOfBirth")} required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="start-date">Start Date</label>
                            <DatePicker className="form-control" id="start-date" selected={data.startDate} onChange={e => handleChange(e, "startDate")} required/>
                        </div>

                        <fieldset className="address row g-3">
                            <legend>Address</legend>
                            <div className="col-12">
                                <label htmlFor="inputStreet" className="form-label">Street</label>
                                <input type="text" className="form-control" id="inputStreet" onChange={e => handleChange(e, "street")} required/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" className="form-control" id="inputCity" onChange={e => handleChange(e, "city")} required/>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputState" className="form-label">State</label>
                                <ReactSelect id="state"
                                             className="form-control"
                                             value={data.state}
                                             options={states}
                                             onChange={e => handleChange(e, "state")}
                                             listLabel="Chose your state"
                                             showListLabel={true}
                                             requiredFeedbackEnabled={true} required />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="inputZip" className="form-label">Zip</label>
                                <input type="text" className="form-control" id="inputZip" onChange={e => handleChange(e, "zip")} required/>
                            </div>
                        </fieldset>

                        <div className="mb-3">
                            <label htmlFor="department">Department</label>
                            <ReactSelect id="department"
                                         value={data.department}
                                         options={departments}
                                         onChange={e => handleChange(e, "department")}
                                         listLabel="Chose your department"
                                         showListLabel={true}
                                         requiredFeedbackEnabled={true} required />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <ReactModal id="create-employee-confirmation" modalContent="Employee has been created succeffully !" isModalOpened={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} />
                    <ReactModal id="create-employee-exist" modalContent="Exist Already !" isModalOpened={showExistModal} onClose={() => setExistModal(false)} />
                </div>
            </main>
        </>
    )
}

export default CreateEmployee;
