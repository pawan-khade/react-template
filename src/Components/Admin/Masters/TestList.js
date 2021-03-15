import React,{useState,useEffect,useContext} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import API from '../../../api';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {ShowContext} from '../../../App';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const TestList = (props) => 
{
    const {setShow,setMsg}                          =   useContext(ShowContext);
    let [loading, setLoading]                       =   useState(true);
    let [testList, setTestList]                     =   useState([]);
    const header                                    =   getHeader();
    const data                                      =   getData(testList,props.setMyList,props.myList,setShow,setMsg);
    

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
        getSubjects(setTestList,setLoading);
    },[props.myList]);

    return (
        testList.length > 0 && !loading ?
        <div className="col-lg-12" style={{overflow:"auto"}}>
            <BootstrapTable keyField='srno' data={ data } columns={ header } filter={ filterFactory() } pagination={ paginationFactory(options) }/>
        </div>
        :   
        null
    );
};

async function getSubjects(setTestList,setLoading)
{
    await API.get('/subject',{params:{'type':'all'}})
    .then(function (res) 
    {
        setTestList(res.data.data);
        console.log(res.data.data);
        setLoading(false);
    })
    .catch(function (error) 
    {
        setTestList(undefined);
        setLoading(false);
    });   
}

function getHeader()
{
    let myHeader = [
        { text: 'Sr No', dataField: 'srno'},
        { text: 'Paper Code/Name', dataField: 'paperCode',filter: textFilter()},
        { text: 'Marks', dataField: 'marks'},
        { text: 'Questions', dataField: 'questions'},
        { text: 'Duration', dataField: 'duration'},
        { text: 'Start Date', dataField: 'startdate'},
        { text: 'End Date', dataField: 'enddate'},
        { text: 'Clear', dataField: 'clear'},
        { text: 'Configure', dataField: 'configure'},
    ];
    return myHeader;
}

function getData(testList,setMyList,myList,setShow,setMsg)
{
    let myData = [];
    let i = 1;
    testList.map((data, index) => 
    {
        myData.push({
            srno                    : i++,
            paperCode               : '('+data.paper_code+') '+data.paper_name,
            marks                   : data.marks,
            questions               : data.questions,
            duration                : data.durations,
            startdate               : data.from_date!=='' ? <Moment format="MMMM Do YYYY, H:mm:ss A">{data.from_date}</Moment> : '',
            enddate                 : data.to_date!=='' ?<Moment format="MMMM Do YYYY, H:mm:ss A">{data.to_date}</Moment> : '',
            clear                   : <button className="btn btn-danger" onClick={()=>{clearRecord(data.id,setMyList,myList,setShow,setMsg);}}>Clear</button>,
            configure                  : data.from_date!=='' ? <Link className="nav-link" to={{pathname: "/configureTest",state:{paperId: data.id,paperCode:data.paper_code,paperName:data.paper_name,data:data}}}>Configure Test</Link> : ''
        });
    })

    return myData;
}

async function clearRecord(id,setMyList,myList,setShow,setMsg)
{
    await API.put('/subject/test/'+id,{'type':'clearTest'})
    .then(function (res) 
    {
        if(res.data.status==='success')
        {
            setShow(true);
            setMsg(res.data.message);
            setMyList(!myList);
            setTimeout(()=>{setShow(false)}, 10000);
        }
    })
    .catch(function (error) 
    {
        setShow(true);
        setMsg(error.response.data.message);
        setTimeout(()=>{setShow(false)}, 10000);
    });
}

export default TestList;