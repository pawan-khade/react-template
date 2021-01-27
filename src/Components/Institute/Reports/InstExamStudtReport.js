import React from 'react';
import {useLocation,useHistory} from 'react-router-dom';

function InstExamStudtReport() 
{
    const location  =  useLocation();
    let allExams    = location.state.data;
    let paper_id    = location.state.paper_id;
    let type        = location.state.type;
    let result      = searchResult(allExams,paper_id,type);
    let i           = 1;
    let history     = useHistory();

    console.log(result);
    return (
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Student Count Report</h1>
                <div className="breadcrumb col-lg-12" style={{color:"maroon"}}>
                    <div class="col-lg-4">
                        <b>Exam Status:</b> {type.toUpperCase()}  
                    </div>
                    <div class="col-lg-4">
                        <b>Paper Code:</b> {location.state.paper_code}
                    </div>
                    <div class="col-lg-4">
                        <button class="btn btn-primary btn-sm" style={{float:"right"}} onClick={() => {history.goBack()}}>Go Back</button>
                    </div> 
                </div>
                <div className="row col-lg-12">
                    <table className="table table-bordered" id="dataTable">
                        <thead>
                        <tr style={{backgroundColor:"aqua"}}>
                            <th>Sr</th>
                            <th>Enrollment Number</th>
                            <th>Exam Start Time</th>
                            <th>Exam End Time</th>
                            <th>Exam Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        { 
                                result.map((data, index) => (   
                                data.stdid ? 
                                <tr key={index}>
                                    <td><center>{i++}</center></td>
                                    <td><center>{data.stdid.username}</center></td> 
                                    <td>{data.startedon}</td>
                                    <td><center>{data.endon}</center></td> 
                                    <td><center>{data.examstatus}</center></td>  
                                </tr>  
                                 : null               
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