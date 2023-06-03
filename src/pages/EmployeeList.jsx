import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import "../styles/list-employees.style.scss"
import {useSelector} from "react-redux";
import {selectEmployeeList} from "../hooks/use.utilitises";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import {InputText} from "primereact/inputtext";                                   // css utility


const EmployeeList = () => {

    const navigate = useNavigate();
    const employees = useSelector(selectEmployeeList());

    useEffect(() => {
        document.title = "HRnet | List Employees";
    }, []);

    const columnsConfiguration = [
        {name: "First Name", id: "firstName", sortable: true},
        {name: "Last Name", id: "lastName", sortable: true},
        {name: "Start Date", id: "startDate", sortable: true},
        {name: "Department", id: "department", sortable: true},
        {name: "Date of Birth", id: "dateOfBirth", sortable: true},
        {name: "Street", id: "street", sortable: true},
        {name: "City", id: "city", sortable: true},
        {name: "State", id: "state", sortable: true},
        {name: "Zip Code", id: "zipCode", sortable: true},
    ];

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        startDate: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        department: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        dateOfBirth: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        state: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        zipCode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        street: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <>
            <main className="list-employees-container card">
                <div className="card">
                    <DataTable value={employees} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                               tableStyle={{minWidth: '50rem'}}
                               header={header}
                               filters={filters}
                               globalFilterFields={['firstName', 'lastName', 'startDate', 'department', 'dateOfBirth', 'street', 'city', 'state', 'zipCode']} emptyMessage="No employes found."
                    >
                        {
                            columnsConfiguration
                                .map((col, i) => (
                                    <Column key={col.id} field={col.id} header={col.name}/>
                                ))
                        }
                    </DataTable>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button onClick={() => navigate("/create-employee")} className="btn btn-primary"
                            type="button">HOME
                    </button>
                </div>
            </main>
        </>
    )
}

export default EmployeeList;
