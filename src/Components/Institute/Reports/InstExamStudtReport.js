import React from 'react';
import {useLocation} from 'react-router-dom';

function InstExamStudtReport() 
{
    const location  =  useLocation();
    let allExams    = location.state.data;
    let paper_id    = location.state.paper_id;
    let type        = location.state.type;
    let result      = searchResult(allExams,paper_id,type);
    let i           = 1;

    console.log(result);
    return (
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Student Count Report</h1>
                <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item active" style={{color:"maroon"}}><b>Exam Status:</b> {type.toUpperCase()}  &nbsp;&nbsp;&nbsp;<b>Paper Code:</b> {location.state.paper_code}</li>
                </ol>
                <div className="row col-lg-12">
                    <table className="table table-bordered" id="dataTable">
                        <thead>
                        <tr style={{backgroundColor:"aqua"}}>
                            <th>Sr</th>
                            <th>Enrollment Number</th>
                            <th>Exam Status</th>
                            <th>Exam Start Time</th>
                            <th>Exam End Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        { 
                            result.map((data, index) => (    
                            <tr key={index}>
                                <td><center>{i++}</center></td>
                                <td><center>{data.stdid.username}</center></td> 
                                <td><center>{data.examstatus}</center></td>  
                                <td>{data.startedon}</td>
                                <td><center>{data.endon}</center></td> 
                            </tr>                 
                        ))                                                            
                    } 
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

function searchResult(allExams,paper_id,type)
{
    let newArr = [];
    if(type === 'over')
    {
        for(let i=0;i < allExams.length; i++)
        {
            if(parseInt(paper_id) === parseInt(allExams[i].paper.id) && allExams[i].examstatus === 'over')
            {
                newArr.push(allExams[i])
            }
        }
        return newArr;
    }
    else if(type === 'inprogress')
    {
        for(let i=0;i < allExams.length; i++)
        {
            if(parseInt(paper_id) === parseInt(allExams[i].paper.id) && allExams[i].examstatus === 'inprogress')
            {
                newArr.push(allExams[i])
            }
        }
        return newArr;
    }
    else if(type === 'notattend')
    {
        for(let i=0;i < allExams.length; i++)
        {
            if(parseInt(paper_id) === parseInt(allExams[i].paper.id) && allExams[i].examstatus === '')
            {
                newArr.push(allExams[i])
            }
        }
        return newArr;
    }
}

export default InstExamStudtReport;