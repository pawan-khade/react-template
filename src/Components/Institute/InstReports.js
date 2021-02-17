import React from 'react';
import { Link } from 'react-router-dom';

function InstReports(props)
{
    return (
      <div>
        <div className="container-fluid">
            <h1 className="mt-4">Institute Reports</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Institute Reports</li>
            </ol>
            <div className="row col-lg-12 animate__animated animate__fadeInDown animate_slower">
            <table className="table table-bordered">
                <thead>
                    <tr style={{backgroundColor:"aqua"}}>
                        <th colSpan={3}><center>Institute Reports</center></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Link  className="nav-link" to={{pathname: "/instexamreport"}}>
                                Institute Examination Report
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

export default InstReports;
