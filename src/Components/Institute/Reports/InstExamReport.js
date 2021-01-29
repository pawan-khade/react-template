import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../api';
import Axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import Moment from 'react-moment';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';


function InstExamReport()
{
    const [allPapers, setAllPapers]                 =   useState([]);
    const [allExams, setAllExams]                   =   useState([]);
    let [loading, setLoading]                       =   useState(true);
    let i                                           =   1;
    const header                                    =   getHeader(allExams);
    const data                                      =   getData(allPapers,allExams);

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
        getPrograms(setAllPapers,setAllExams,setLoading);
    },[]);

    return (
    allPapers.length > 0 && !loading ?
      <div>
        <div className="container-fluid">
            <h1 className="mt-4">Institute Examination Report</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Institute Examination Report</li>
            </ol>
            <div className="row col-lg-12" style={{overflow:"auto"}}>
                <BootstrapTable keyField='srno' data={ data } columns={ header } filter={ filterFactory() } pagination={ paginationFactory(options) }/>
            </div>
        </div>
      </div>
      : <div className="col-lg-12" style={{position:"absolute",top:"40%",left:"50%"}}>
            <ClipLoader color={'#ff0000'} loading={loading} size={200} />
        </div>
    );
}

function getHeader(allExams)
{
    let myHeader = [
        { text: 'Sr No', dataField: 'srno'},
        { text: 'Date & Start Time', dataField: 'datenstarttime',filter: textFilter()},
        { text: 'Code', dataField: 'code',filter: textFilter()},
        { text: 'Subject Name', dataField: 'subjectname',filter: textFilter()},
        { text: 'Marks', dataField: 'marks'},
        { text: 'Total Q\'s', dataField: 'totquestions'},
        { text: 'Duration', dataField: 'duration'},
        { text: 'Total Students', dataField: 'totstud'},
        { text: 'Total End', dataField: 'totend'},
        { text: 'Total Inprogress', dataField: 'totinprogress'},
        { text: 'Total Not Attend', dataField: 'totnotattend'},
    ];
    return myHeader;
}

function getData(allPapers,allExams)
{
    let myData = [];
    let i = 1;

    allPapers.map((data, index) => (
        myData.push({
            srno                    : i++,
            datenstarttime          : <Moment format="YYYY-MM-DD H:mm:ss">{data.from_date}</Moment>,
            code                    : data.paper_code,
            subjectname             : data.paper_name,
            marks                   : data.marks,
            totquestions            : data.questions,
            duration                : data.durations,
            totstud                 : getCount(allExams,'total',data.id),
            totend                  : <Link to={{pathname: "/instexamstudentreport", state:{data:allExams,paper_id:data.id,type:'over',paper_code:data.paper_code}}}> {getCount(allExams,'end',data.id)}</Link>,
            totinprogress           : <Link to={{pathname: "/instexamstudentreport", state:{data:allExams,paper_id:data.id,type:'inprogress',paper_code:data.paper_code}}}> {getCount(allExams,'inprogress',data.id)}  </Link>,
            totnotattend            : <Link to={{pathname: "/instexamstudentreport", state:{data:allExams,paper_id:data.id,type:'notattend',paper_code:data.paper_code}}}>{getCount(allExams,'notattend',data.id)} </Link>
        })   
    ))

    return myData;
}

async function getPrograms(setAllPapers,setAllExams,setLoading)
{
    let allPapers = [];
    let allExams  = [];
        const res = await API.get('/program');
        if(res.data.status==='success')
        {
            if(res.data.data.length > 0)
            {
                for(let i=0;i<res.data.data.length;i++)
                {
                    Axios.all([
                        await API.get('/paper',{ params: {"program_id":res.data.data[i].id}}),
                        await API.get('/exam/'+res.data.data[i].id,{ params: {"type":"byprogramid"}})
                    ])
                    .then(responseArr => 
                    {
                        if(responseArr[0].data.status==='success')
                        {
                            if(responseArr[0].data.data.length > 0)
                            {
                                allPapers.push(...responseArr[0].data.data);
                            }
                        }   
                        
                        if(responseArr[1].data.status==='success')
                        {
                            if(responseArr[1].data.data.length > 0)
                            {
                                allExams.push(...responseArr[1].data.data);
                            }
                        }
                    });
                }
                allPapers = [...allPapers];
                allPapers = [...new Set(allPapers)];

                allPapers.sort(function(a,b)
                {
                    return a.from_date - b.from_date;
                });
                
                if(allPapers.length > 0 && allExams.length > 0)
                {
                    setAllPapers(allPapers);
                    setAllExams(allExams);
                    setLoading(false);
                    //console.log(allExams);
                } 
            }
        }
}

function getCount(allExams,str,paper_id)
{
    let total=0;
    let end=0;
    let inprogress=0;
    let absent=0;

    if(str === 'total')
    {
        for(let i=0;i < allExams.length; i++)
        {
            if(parseInt(paper_id) === parseInt(allExams[i].paper.id))
            {
                total++;
            }
        }
        return total;
    }
    else if(str === 'end')
    {
        for(let i=0;i < allExams.length; i++)
        {
            if(parseInt(paper_id) === parseInt(allExams[i].paper.id) && allExams[i].examstatus === 'over')
            {
                end++;
            }
        }
        return end;
    }
    else if(str === 'inprogress')
    {
        for(let i=0;i < allExams.length; i++)
        {
            if(parseInt(paper_id) === parseInt(allExams[i].paper.id) && allExams[i].examstatus === 'inprogress')
            {
                inprogress++;
            }
        }
        return inprogress;
    }
    else if(str === 'notattend')
    {
        for(let i=0;i < allExams.length; i++)
        {
            if(parseInt(paper_id) === parseInt(allExams[i].paper.id) && allExams[i].examstatus === '')
            {
                absent++;
            }
        }
        return absent;
    }
}

export default InstExamReport;
