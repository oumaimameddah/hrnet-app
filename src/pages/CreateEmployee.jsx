import '../styles/create-employe.style.scss'
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "../hooks/useForm";
import {departments, states} from "../hooks/api";

const CreateEmployee = () => {

    useEffect(() => {
        document.title = "HRnet | Create Employee"; // to change page title
    }, []);

    const navigate = useNavigate(); // to navigate to other page

    const {
        handleSubmit,
        handleChange,
        data,
        errors,
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
        }
    })


    return (<main className="employee-container">
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
                    <input className="form-control" type="text" id="first-name"/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="last-name">Last Name</label>
                    <input className="form-control" type="text" id="last-name"/>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="date-of-birth">Date of Birth</label>
                    <input className="form-control" id="date-of-birth" type="text"/>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="start-date">Start Date</label>
                    <input className="form-control" id="start-date" type="text"/>
                </div>

                <fieldset className="address row g-3">
                    <legend>Address</legend>
                    <div className="col-12">
                        <label htmlFor="inputStreet" className="form-label">Street</label>
                        <input type="text" className="form-control" id="inputStreet"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">City</label>
                        <input type="text" className="form-control" id="inputCity"/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">State</label>
                        <select id="inputState" className="form-select"></select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputZip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="inputZip"/>
                    </div>
                </fieldset>

                <div className="mb-3">
                    <label htmlFor="department">Department</label>
                    <select name="department" id="department" className="form-select" aria-label="Select departement">
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Engineering">Engineering</option>
                        <option value="HR">Human Resources</option>
                        <option value="Legal">Legal</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </main>)
}

export default CreateEmployee;