import React, { useContext } from 'react';
import {UserContext} from '../App';
import { Link } from 'react-router-dom';

function Sidebar() 
{
    const {currentUser, setCurrentUser}   = useContext(UserContext);

    if(currentUser && currentUser.role === 'STUDENT')
    {
        return (
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Main Menu</div>
                            <Link className="nav-link" to={{pathname: "/studenthome"}}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Home
                            </Link>
                        </div>
                    </div>
                </nav>
        );
    }
    else if(currentUser && currentUser.role === 'ADMIN')
    {
        return (
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Main Menu</div>
                        <Link  className="nav-link" to={{pathname: "/adminhome"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Home
                        </Link>
                        <Link  className="nav-link" to={{pathname: "/clearsession"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-address-card"></i></div>
                            Clear Session
                        </Link>

                        <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseConfigurations" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-cogs"></i></div>
                                General Configurations
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseConfigurations" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to={{pathname: "/configHeader"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-tools"></i></div>
                                    Configure Header
                                </Link>
                                <Link className="nav-link" to={{pathname: "/configFooter"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-tools"></i></div>
                                    Configure Footer
                                </Link>
                                <Link className="nav-link" to={{pathname: "/addGlobController"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-tools"></i></div>
                                    Add Global Controller
                                </Link>
                                <Link className="nav-link" to={{pathname: "/addClusterController"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-tools"></i></div>
                                    Add Cluster Controller
                                </Link>
                                <Link className="nav-link" to={{pathname: "/addInstitutes"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-university"></i></div>
                                    Add/Upload Institutes
                                </Link>
                                <Link className="nav-link" to={{pathname: "/globalClusterAllocation"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-university"></i></div>
                                    Global-Cluster Alloc
                                </Link>
                                <Link className="nav-link" to={{pathname: "/instClusterAllocation"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-university"></i></div>
                                    Inst-Cluster Alloc
                                </Link>
                            </nav>
                        </div>

                        <a className="nav-link collapsed" data-toggle="collapse" data-target="#examConfigurations" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-cogs"></i></div>
                                Exam Configurations
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="examConfigurations" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to={{pathname: "/programMaster"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-list-alt"></i></div>
                                    Program Master
                                </Link>
                                <Link className="nav-link" to={{pathname: "/subjectMaster"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-list-alt"></i></div>
                                    Subject Master
                                </Link>
                                <Link className="nav-link" to={{pathname: "/addTest"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-list-alt"></i></div>
                                    Add Test
                                </Link>
                                <Link className="nav-link" to={{pathname: "/studentMaster"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-list-alt"></i></div>
                                    Student Master
                                </Link>
                                <Link className="nav-link" to={{pathname: "/studSubjectAlloc"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-list-alt"></i></div>
                                    Stud Subject Alloc
                                </Link>
                            </nav>
                        </div>

                        <Link  className="nav-link" to={{pathname: "/adminreports"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-clipboard-list"></i></div>
                            Reports
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
    else if(currentUser && currentUser.role === 'EADMIN')
    {
        return (
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Main Menu</div>
                        <Link  className="nav-link" to={{pathname: "/insthome"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Home
                        </Link>
                        <Link  className="nav-link" to={{pathname: "/clearsession"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-address-card"></i></div>
                            Clear Session
                        </Link>
                        <Link  className="nav-link" to={{pathname: "/instreports"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-clipboard-list" aria-hidden="true"></i></div>
                            Reports
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
    else if(currentUser && currentUser.role === 'GADMIN')
    {
        return (
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Main Menu</div>
                            <Link className="nav-link" to={{pathname: "/gadminhome"}}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Home
                            </Link>
                        </div>
                    </div>
                </nav>
        );
    }
    else if(currentUser && currentUser.role === 'CADMIN')
    {
        return (
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Main Menu</div>
                            <Link className="nav-link" to={{pathname: "/cadminhome"}}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Home
                            </Link>

                            <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseConfigurations" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-cogs"></i></div>
                                Configurations
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseConfigurations" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to={{pathname: "/addInstitutes"}}>
                                        <div className="sb-nav-link-icon"><i className="fas fa-university"></i></div>
                                        Add/Upload Institutes
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                </nav>
        );
    }
    else
    {
        return (
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Main Menu</div>
                        <Link  className="nav-link" to={{pathname: "/"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Home
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Sidebar;