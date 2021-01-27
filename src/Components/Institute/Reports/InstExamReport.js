import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../api';
import Axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import Moment from 'react-moment';


function InstExamReport()
{
    const [allPapers, setAllPapers]                 =   useState([]);
    const [allExams, setAllExams]                   =   useState([]);
    let [loading, setLoading]                       =   useState(true);
    let i                                           =   1;
   

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
                <table className="table table-bordered" id="dataTable">
                    <thead>
                    <tr style={{backgroundColor:"aqua"}}>
                        <th>Sr</th>
                        <th>Date & Start Time</th>
                        <th>Code</th>
                        <th>Subject Name</th>
                        <th>Marks</th>
                        <th>Total Q's</th>
                        <th>Duration</th>
                        <th>Total<br/>Students</th>
                        <th>Total<br/>End</th>
                        <th>Total<br/>Inprogress</th>
                        <th>Total<br/>Not Attend</th>
                    </tr>
                    </thead>
                    <tbody>
                    { 
                        allPapers.map((data, index) => (    
                            <tr key={index}>
                                <td><center>{i++}</center></td>
                                <td><center><Moment format="MMMM Do YYYY, H:mm:ss A">{data.from_date}</Moment></center></td> 
                                <td><center>{data.paper_code}</center></td>  
                                <td>{data.paper_name}</td>
                                <td><center>{data.marks}</center></td> 
                                <td><center>{data.questions}</center></td>  
                                <td><center>{data.durations}</center></td>
                                <td><center>{getCount(allExams,'total',data.id)}</center></td> 
                                <td><center>
                                    <Link to={{pathname: "/instexamstudentreport", state:{data:allExams,paper_id:data.id,type:'over',paper_code:data.paper_code}}}>     
                                        {getCount(allExams,'end',data.id)}
                                    </Link></center>
                                </td>                                   
                                <td><center>
                                    <Link to={{pathname: "/instexamstudentreport", state:{data:allExams,paper_id:data.id,type:'inprogress',paper_code:data.paper_code}}}>
                                    {getCount(allExams,'inprogress',data.id)}
                                    </Link>
                                    </center>
                                </td> 
                                <td><center>
                                    <Link to={{pathname: "/instexamstudentreport", state:{data:allExams,paper_id:data.id,type:'notattend',paper_code:data.paper_code}}}>
                                    {getCount(allExams,'notattend',data.id)}
                                    </Link>
                                    </center>
                                </td>                                   
                            </tr>                 
                        ))                                                            
                    } 
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      : <div className="col-lg-12" style={{position:"absolute",top:"40%",left:"50%"}}>
            <ClipLoader color={'#ff0000'} loading={loading} size={200} />
        </div>
    );
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
