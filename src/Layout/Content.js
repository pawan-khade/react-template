import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Login from '../Components/Login';
import StudHome from '../Components/Student/StudHome';
import Instructions from '../Components/Student/Instructions';
import Startexam from '../Components/Startexam';

import AdminHome from '../Components/Admin/Adminhome';
import ClearSession from '../Components/Admin/ClearSession';

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
                            <Route exact path="/clearsession" component={ClearSession} />
                        </main>
                        <footer className="py-4 bg-light mt-auto">
                            <Footer />
                        </footer>
                    </div>
                </div>
        );
}

export default Content;
