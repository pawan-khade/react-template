import React from 'react';
import { Link } from 'react-router-dom';

function AdminReports(props)
{
    return (
      <div>
        <div className="container-fluid">
            <h1 className="mt-4">Admin Reports</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Admin Reports</li>
            </ol>
            <div className="row col-lg-12">
                <table className="table table-bordered">
                    <thead>
                        <tr style={{backgroundColor:"aqua"}}>
                            <th colSpan={3}><center>Admin Examination Reports</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Link  className="nav-link" to={{pathname: "/adminexamreport"}}>
                                    Examination Report
                                </Link>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    );
}

export default AdminReports;