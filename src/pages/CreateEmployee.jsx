import '../styles/create-employe.style.scss'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "../hooks/useForm";
import {departments, states} from "../hooks/api";
import ReactModal from "../components/ReactModal";
import ReactSelect from "../components/ReactSelect";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch} from "react-redux";

import { addEmployeeLoListAction } from "../redux/employee";

const CreateEmployee = () => {

    useEffect(() => {
        document.title = "HRnet | Create Employee"; // to change page title
    }, []);

    const dispatch = useDispatch();

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const navigate = useNavigate(); // to navigate to other page

    const {
        handleSubmit,
        handleChange,
        data,
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
            console.log(data);
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
            dispatch(addEmployeeLoListAction(employee))
            setShowConfirmationModal(true);
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
                    <button onClick={() => navigate("/employee-list")} aria-label="Navigate to employee list page" type="button" className="btn btn-outline-success btn-view-employee">View Current Employees</button>

                    <h2 className="title-create-employee">Create Employee form</h2>

                    <form
                        id="create-employee"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <label className="form-label" htmlFor="first-name">First Name</label>
                            <input className="form-control" type="text" id="first-name" onChange={e => handleChange(e, "firstName")}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="last-name">Last Name</label>
                            <input className="form-control" type="text" id="last-name" onChange={e => handleChange(e, "lastName")}/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="date-of-birth">Date of Birth</label>
                            <DatePicker className="form-control" id="date-of-birth"  selected={data.dateOfBirth} onChange={e => handleChange(e, "dateOfBirth")} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="start-date">Start Date</label>
                            <DatePicker className="form-control" id="start-date" selected={data.startDate} onChange={e => handleChange(e, "startDate")} />
                        </div>

                        <fieldset className="address row g-3">
                            <legend>Address</legend>
                            <div className="col-12">
                                <label htmlFor="inputStreet" className="form-label">Street</label>
                                <input type="text" className="form-control" id="inputStreet" onChange={e => handleChange(e, "street")}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" className="form-control" id="inputCity" onChange={e => handleChange(e, "city")}/>
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
                                             requiredFeedbackEnabled={true} />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="inputZip" className="form-label">Zip</label>
                                <input type="text" className="form-control" id="inputZip" onChange={e => handleChange(e, "zip")}/>
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
                                         requiredFeedbackEnabled={true} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <ReactModal id="create-employee-confirmation" modalContent="Employee has been created succeffully !" isModalOpened={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} />
                </div>
            </main>
        </>
    )
}

export default CreateEmployee;
