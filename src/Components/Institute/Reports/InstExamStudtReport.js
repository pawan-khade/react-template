import React, { useEffect, useState } from 'react';
import {useLocation,useHistory} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import API from '../../../api';

function InstExamStudtReport() 
{
    const location                  = useLocation();
    let [allExams,paper_id,type]    = useData();
    let result                      = searchResult(allExams,paper_id,type);
    const header                    = getHeader();
    const data                      = getData(result);
    let history                     = useHistory();

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
                text: 'All', value: data.length
            }
        ]
    };
    return (
        location.state && allExams ?
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Student Count Report</h1>
                <div className="breadcrumb col-lg-12" style={{color:"maroon"}}>
                    <div className="col-lg-4">
                        <b>Exam Status:</b> {type.toUpperCase()}  
                    </div>
                    <div className="col-lg-4">
                        <b>Paper Code:</b> {location.state.paper_code}
                    </div>
                    <div className="col-lg-4">
                        <button className="btn btn-primary btn-sm" style={{float:"right"}} onClick={() => {history.goBack()}}>Go Back</button>
                    </div> 
                </div>
                <div className="row col-lg-12 animate__animated animate__fadeInDown animate_slower" style={{overflow:"auto"}}>
                    <BootstrapTable keyField='srno' data={ data } columns={ header } filter={ filterFactory() } pagination={ paginationFactory(options) }/>
                </div>

            </div>
        </div>
        : null
    );
}

function getHeader()
{
    let myHeader = [
        { text: 'Sr No', dataField: 'srno'},
        { text: 'Enrollment Number', dataField: 'enrollno',filter: textFilter()},
        { text: 'Exam Start Time', dataField: 'startedon',filter: textFilter()},
        { text: 'Exam End Time', dataField: 'endon',filter: textFilter()},
        { text: 'Exam Status', dataField: 'examstatus',filter: textFilter()}
    ];
    return myHeader;
}


function getData(result)
{
    let myData = [];
    let i = 1;
    if(result)
    {
        result.filter(function(data) {
            if(data.stdid)
            {
                return true;
            }
            else
            {
                return false;
            }
        }).map((data, index) => (
            myData.push({
                srno            : i++,
                enrollno        : data.stdid.username,
                startedon       : data.startedon,
                endon           : data.endon,
                examstatus      : data.examstatus
            })   
        ))
    }
    return myData;
}


function searchResult(allExams,paper_id,type)
{
    if(allExams && allExams.length > 0)
    {
        let newArr = [];
        if(type === 'over')
        {
            for(let i=0;i < allExams.length; i++)
            {
                if(allExams[i].paper && parseInt(paper_id) === parseInt(allExams[i].paper.id) && allExams[i].examstatus === 'over')
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
                if(allExams[i].paper && parseInt(paper_id) === parseInt(allExams[i].paper.id) && allExams[i].examstatus === 'inprogress')
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
                console.log(allExams[i].examstatus);
                if(allExams[i].paper && parseInt(paper_id) === parseInt(allExams[i].paper.id) && allExams[i].examstatus === null)
                {
                    newArr.push(allExams[i])
                }
            }
            return newArr;
        }
    }
    
}


function useData()
{
    let [allExams, setAllExams]     = useState();
    let [paper_id,setPaperId]       = useState('');
    let [type,setType]              = useState('');

    let history                     = useHistory();
    const location                  = useLocation();

    useEffect(() => {
        
        if(location.state)
        {
            getExamData(location.state.paper_id,location.state.type,setAllExams,setPaperId,setType);
        }
        else
        {
            history.replace('/insthome');
        }
    },[location.state,history]);

    return [
        allExams,paper_id,type
    ];
}

async function getExamData(paper_id,type,setAllExams,setPaperId,setType)
{
    await API.get('exam/bypaperid/type',{params:{"paper_id":paper_id,"type":type}})
    .then(function (res) 
    {
        if(res.data.status === 'success')
        {
            setPaperId(paper_id);
            setType(type);
            setAllExams(res.data.data);
        }
        
    })
    .catch(function (error) 
    {
        console.log(error);
    });
}

export default InstExamStudtReport;