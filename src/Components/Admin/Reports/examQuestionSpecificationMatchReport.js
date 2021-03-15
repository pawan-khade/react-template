import { getDefaultNormalizer } from '@testing-library/react';
import React,{useState, useEffect} from 'react';
import API from '../../../api';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

const ExamQuestionSpecificationReport = () => 
{
    const [data, setData]                   =   useState([]);
    let header                            =   [];
    let data1                             =   [];


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

    useEffect(()=>{
        getQuestSpecificationComparison(setData);
    },[]);

    if(data.length > 0)
    {
        header = getHeader();
        data1 = getData(data);
    }

    return (
        <div>
        <div className="container-fluid">
            <h1 className="mt-4">Exam Question Specification Match Report</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Exam Question Specification Match Report</li>
            </ol>
            {data.length > 0 ?
            <div className="row col-lg-12">
                <BootstrapTable keyField='srno' data={ data1 } columns={ header } filter={ filterFactory() } pagination={ paginationFactory(options) }/>
            </div>
            :   <div class="alert alert-danger">
                    No Discripancy in Exam Question Data Found
                </div>}
        </div>
      </div>
    );
};

async function getQuestSpecificationComparison(setData)
{
    await API.get('/questions/specification/compare',{params:{"type":"match"}})
    .then((res) => {
        if(res.data.status === 'success')
        {
            setData(res.data.data);
        }
        else
        {
            
        }
    });
}

function getHeader()
{
    let myHeader = [
        { text: 'Sr No', dataField: 'srno'},
        { text: 'Paper Code', dataField: 'paperCode',filter: textFilter()},
        { text: 'Topic',dataField: 'topic',filter: textFilter()},
        { text: 'Question Type', dataField: 'questType',filter: textFilter()},
        { text: 'Marks/Question', dataField: 'marks',filter: textFilter()},
        { text: 'Expected Question Count', dataField: 'expected'},
        { text: 'Actual Question Count', dataField: 'actual'},
    ];
    return myHeader;
}

function getData(myData1)   
{
    let myData = [];
    let i = 1;
    myData1.map((data, index) => 
    {
        myData.push({
            srno                    : i++,
            paperCode               : data.paper_code,
            topic                   : <center>{data.topic}</center>,
            questType               : <center>{data.questType}</center>,
            marks                   : <center>{data.marks}</center>,
            expected                : <center>{data.expected}</center>,
            actual                  : <center>{data.actual}</center>      
        });
    })

    return myData;
}

export default ExamQuestionSpecificationReport;