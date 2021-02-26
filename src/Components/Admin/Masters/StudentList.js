import React,{useState,useEffect,useContext} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import API from '../../../api';
import ClipLoader from "react-spinners/ClipLoader";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {ShowContext} from '../../../App';

const StudentList = (props) => 
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
        getStudents(setStudentList,setLoading);
    },[props.myList]);

    return (
        studentList.length > 0 && !loading ?
        <div className="col-lg-12" style={{overflow:"auto"}}>
            <BootstrapTable keyField='srno' data={ data } columns={ header } filter={ filterFactory() } pagination={ paginationFactory(options) }/>
        </div>
        :   
        <div className="col-lg-12" style={{position:"absolute",top:"40%",left:"50%"}}>
            <ClipLoader color={'#ff0000'} loading={loading} size={200} />
        </div>
    );
};

async function getStudents(setStudentList,setLoading)
{
    await API.get('/user', {params: {'role': 'STUDENT'}})
    .then(function (res) 
    {
        setStudentList(res.data.data);
        console.log(res.data.data);
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
        { text: 'Mobile No', dataField: 'mobile',filter: textFilter()},
        { text: 'Email Address', dataField: 'email',filter: textFilter()},
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
            enrollno                : data.username,
            studname                : data.name,
            instid                  : data.inst_id,
            semester                : data.semester,
            mobile                  : data.mobile,
            email                   : data.email,
            delete                  : <button className="btn btn-danger" onClick={()=>{deleteRecord(data.uid,setMyList,myList,setShow,setMsg);}}>Delete</button>
        });
    })

    return myData;
}

async function deleteRecord(uid,setMyList,myList,setShow,setMsg)
{
    await API.delete('/user/'+uid)
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

export default StudentList;