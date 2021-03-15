import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../api';
import Moment from 'react-moment';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {ShowContext} from '../../../App';


function InstExamReport(props)
{
    const {setShow,setMsg}                          =   useContext(ShowContext);
    const [allData, setAllData]                     =   useState([]);
    let [loading, setLoading]                       =   useState(true);
    const header                                    =   getHeader();
    const data                                      =   getData(allData,props);

    const options = {
        sizePerPageList: [
            {
                text: '5', value: 5
            }, 
            {
                text: '10', value: 10
            }, 
            {
                text: '50', value: 50
            },
            {
                text: '500', value: 500
            }, 
            {
                text: '1000', value: 1000
            }, 
            {
                text: '10000', value: 10000
            }
        ]
    };
   
    useEffect(() => 
    {
        getExamData(setAllData,setLoading,setShow,setMsg,props);
    },[]);

    return (
        allData && allData.length > 0 && !loading ?
      <div>
        <div className="container-fluid">
            {(props.role==='' || props.role===undefined) &&(<h1 className="mt-4">Institute Examination Report</h1>)}
            {(props.role==='' || props.role===undefined) &&(<ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Institute Examination Report</li>
            </ol>)}<br/>
            <div className="row col-lg-12 animate__animated animate__fadeInDown animate_slower" style={{overflow:"auto"}}>
                
                <BootstrapTable keyField='srno' data={ data } columns={ header } filter={ filterFactory() } pagination={ paginationFactory(options) }/>
            </div>
        </div>
      </div>
      : <div className="custom-loader"></div>
    );
}

function getHeader()
{
    let myHeader = [
        { text: 'Sr No', dataField: 'srno'},
        { text: 'Date & Start Time', dataField: 'datenstarttime',filter: textFilter()},
        { text: 'Code', dataField: 'code',filter: textFilter()},
        { text: 'Subject Name', dataField: 'subjectname',filter: textFilter()},
        { text: 'Marks', dataField: 'marks'},
        { text: 'Total Q\'s', dataField: 'totquestions'},
        { text: 'Duration', dataField: 'duration'},
        { text: 'Total Students', dataField: 'totstud',filter: textFilter()},
        { text: 'Total End', dataField: 'totend',filter: textFilter()},
        { text: 'Total Inprogress', dataField: 'totinprogress',filter: textFilter()},
        { text: 'Total Not Attend', dataField: 'totnotattend',filter: textFilter()},
    ];
    return myHeader;
}

function getData(allData,props)
{
    let myData      = [];
    let i           = 1;
    let paper_name  = '';

        allData.map((data, index) => 
        {
            if(allData[index] && Object.keys(allData[index]).length === 0 && allData[index].constructor === Object)
            {
                paper_name = data.paper_name;
            }
            else
            {
                paper_name= (props.role==='ADMIN') ?  <Link to={{pathname: '/instructions',state: {exam:data.exam,role:'ADMIN'}}}>{data.paper_name}</Link> :  data.paper_name ;
            }
            myData.push({
                srno                    : i++,
                datenstarttime          : <Moment format="YYYY-MM-DD H:mm:ss">{data.from_date}</Moment>,
                code                    : data.paper_code,
                subjectname             : paper_name,
                marks                   : data.marks,
                totquestions            : data.questions,
                duration                : data.duration,
                totstud                 : data.allStudents,
                totend                  : <Link to={{pathname: "/instexamstudentreport", state:{data:allData,paper_id:data.id,type:'over',paper_code:data.paper_code}}}>{data.overStudents}</Link>,
                totinprogress           : <Link to={{pathname: "/instexamstudentreport", state:{data:allData,paper_id:data.id,type:'inprogress',paper_code:data.paper_code}}}> {data.inprogressStudents}</Link>,
                totnotattend            : <Link to={{pathname: "/instexamstudentreport", state:{data:allData,paper_id:data.id,type:'notattend',paper_code:data.paper_code}}}>{data.unattendStudents}</Link>
            })   
        });
    return myData;
}

async function getExamData(setAllData,setLoading,setShow,setMsg,props)
{
    let res         = [];
    if(props.role==='ADMIN')
    {
        if(props.instId === '')
        {
            setMsg('Please Select Institute to get its report...');
            setShow(true);
            setAllData([]);
        }
        //----------fetch exam report from institute id----------------------------------------
        res = await API.get('exam/report/count',{params:{"type":"instwise",instId:props.instId}});
        //----------------------------------------------------------------------------------
    }
    else
    {
        res = await API.get('exam/report/count');
    }
        if(res.data.status==='success')
        {
            if(res.data.data !== undefined)
            {
                setAllData(res.data.data);
            }
            else
            {
                setAllData([]);
                setShow(true);
                setMsg('No Program Data found for this Institute.Please Add data or Configure it Properly...');
                setLoading(false);
            }
        }
        else
        {
            setAllData([]);
            setShow(true);
            setMsg('Problem fetching data from Server...');
            setLoading(false);
        }
        setLoading(false);
}


export default InstExamReport;
