import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import "../styles/list-employees.style.scss"
import {useSelector} from "react-redux";
import {selectEmployeeList} from "../hooks/use.utilitises";

const EmployeeList = () => {

    const navigate = useNavigate();
    const employees = useSelector(selectEmployeeList());

    useEffect(() => {
        document.title = "HRnet | List Employees";
    }, []);

    const columnsConfiguration = [
        { name: "First Name", id: "firstName", sortable: true },
        { name: "Last Name", id: "lastName", sortable: true },
        { name: "Start Date", id: "startDate", sortable: true },
        { name: "Department", id: "department", sortable: true },
        { name: "Date of Birth", id: "dateOfBirth", sortable: true },
        { name: "Street", id: "street", sortable: true },
        { name: "City", id: "city", sortable: true },
        { name: "State", id: "state", sortable: true },
        { name: "Zip Code", id: "zipCode", sortable: true },
    ];

    return (
        <>
          <main className="list-employees-container card">
              <DataTable value={employees} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                  {
                      columnsConfiguration
                          .map((col, i) => (
                          <Column key={col.id} field={col.id} header={col.name} />
                      ))
                  }
              </DataTable>
          </main>
        </>
    )
}

export default EmployeeList;
