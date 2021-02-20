import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Login from '../Components/Login';
import StudHome from '../Components/Student/StudHome';
import Instructions from '../Components/Student/Instructions';
import Startexam from '../Components/Startexam';

import AdminHome from '../Components/Admin/Adminhome';
import AdminReports from '../Components/Admin/AdminReports';
import AdminExamReport from '../Components/Admin/Reports/AdminExamReport';
import ClearSession from '../Components/Admin/ClearSession';
import ConfigureHeader from '../Components/Admin/Configurations/ConfigureHeader';
import ConfigureFooter from '../Components/Admin/Configurations/ConfigureFooter';

import InstHome from '../Components/Institute/InstHome';
import InstReports from '../Components/Institute/InstReports';
import InstExamReport from '../Components/Institute/Reports/InstExamReport';
import InstExamStudReport from '../Components/Institute/Reports/InstExamStudtReport';

import GlobalController from '../Components/Admin/Configurations/GlobalController';
import ClusterController from '../Components/Admin/Configurations/ClusterController';
import GadminHome from '../Components/Gadmin/GadminHome';
import CadminHome from '../Components/Cadmin/CadminHome';
import AddInstitute from '../Components/Cadmin/AddInst';

function Content() 
{
        return (
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav"><Sidebar /></div>
                    <div id="layoutSidenav_content">
                        <main>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/studenthome" component={StudHome} />
                            <Route exact path="/instructions" component={Instructions} />
                            <Route exact path="/startexam" component={Startexam} />

                            <Route exact path="/adminhome" component={AdminHome} />
                            <Route exact path="/adminreports" component={AdminReports} />
                            <Route exact path="/adminexamreport" component={AdminExamReport} />
                            <Route exact path="/clearsession" component={ClearSession} />
                            <Route exact path="/configHeader" component={ConfigureHeader} />
                            <Route exact path="/configFooter" component={ConfigureFooter} />

                            <Route exact path="/insthome" component={InstHome} />
                            <Route exact path="/instreports" component={InstReports} />
                            <Route exact path="/instexamreport" component={InstExamReport} />
                            <Route exact path="/instexamstudentreport" component={InstExamStudReport} />

                            <Route exact path="/addGlobController" component={GlobalController} />
                            <Route exact path="/addClusterController" component={ClusterController} />
                            <Route exact path="/gadminhome" component={GadminHome} />
                            <Route exact path="/cadminhome" component={CadminHome} />

                            <Route exact path="/addInstitutes" component={AddInstitute} />
                        </main>
                        <footer className="py-4 bg-light mt-auto">
                            <Footer />
                        </footer>
                    </div>
                </div>
        );
}

export default Content;
