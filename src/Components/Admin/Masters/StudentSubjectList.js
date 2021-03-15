import React,{useState,useEffect,useContext} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import API from '../../../api';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {ShowContext} from '../../../App';

const StudentSubjectList = (props) => 
{
    const {setShow,setMsg}                          =   useContext(ShowContext);
    let [loading, setLoading]                       =   useState(true);
    let [studentList, setStudentList]               =   useState([]);
    const header                                    =   getHeader();
    const data                                      =   getData(studentList,props.setMyList,props.myList,setShow,setMsg);
    

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
        getStudentSubjects(setStudentList,setLoading);
    },[props.myList]);

    return (
        studentList.length > 0 && !loading ?
        <div className="col-lg-12" style={{overflow:"auto"}}>
            <BootstrapTable keyField='srno' data={ data } columns={ header } filter={ filterFactory() } pagination={ paginationFactory(options) }/>
        </div>
        :   
        null
    );
};

async function getStudentSubjects(setStudentList,setLoading)
{
    await API.get('/exam')
    .then(function (res) 
    {
        setStudentList(res.data.data);
        setLoading(false);
    })
    .catch(function (error) 
    {
        setStudentList(undefined);
        setLoading(false);
    });   
}

function getHeader()
{
    let myHeader = [
        { text: 'Sr No', dataField: 'srno'},
        { text: 'Enrollment No', dataField: 'enrollno',filter: textFilter()},
        { text: 'Student Name', dataField: 'studname',filter: textFilter()},
        { text: 'Inst Id', dataField: 'instid',filter: textFilter()},
        { text: 'Semester', dataField: 'semester',filter: textFilter()},
        { text: 'Program', dataField: 'program',filter: textFilter()},
        { text: 'Subject', dataField: 'subject',filter: textFilter()},
        { text: 'Delete', dataField: 'delete'},
    ];
    return myHeader;
}

function getData(studentList,setMyList,myList,setShow,setMsg)
{
    let myData = [];
    let i = 1;
    studentList.map((data, index) => 
    {
        myData.push({
            srno                    : i++,
            enrollno                : data.stdid.username,
            studname                : data.stdid.name,
            instid                  : data.stdid.inst_id,
            semester                : data.stdid.semester,
            program                 : data.paper.program.program_code,
            subject                 : '('+data.paper.paper_code+') '+data.paper.paper_name,
            delete                  : <button className="btn btn-danger" onClick={()=>{deleteRecord(data.id,setMyList,myList,setShow,setMsg);}}>Delete</button>
        });
    })

    return myData;
}

async function deleteRecord(id,setMyList,myList,setShow,setMsg)
{
    await API.delete('/exam/'+id)
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

export default StudentSubjectList;