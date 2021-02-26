import React,{useState,useEffect,useContext} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import API from '../../../api';
import ClipLoader from "react-spinners/ClipLoader";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {ShowContext} from '../../../App';

const SubjectList = (props) => 
{
    const {setShow,setMsg}                          =   useContext(ShowContext);
    let [loading, setLoading]                       =   useState(true);
    let [subjectList, setSubjectList]               =   useState([]);
    const header                                    =   getHeader();
    const data                                      =   getData(subjectList,props.setMyList,props.myList,setShow,setMsg);
    

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
        getSubjects(setSubjectList,setLoading);
    },[props.myList]);

    return (
        subjectList.length > 0 && !loading ?
        <div className="col-lg-12" style={{overflow:"auto"}}>
            <BootstrapTable keyField='srno' data={ data } columns={ header } filter={ filterFactory() } pagination={ paginationFactory(options) }/>
        </div>
        :   
        <div className="col-lg-12" style={{position:"absolute",top:"40%",left:"50%"}}>
            <ClipLoader color={'#ff0000'} loading={loading} size={200} />
        </div>
    );
};

async function getSubjects(setSubjectList,setLoading)
{
    await API.get('/subject',{params:{'type':'all'}})
    .then(function (res) 
    {
        setSubjectList(res.data.data);
        console.log(res.data.data);
        setLoading(false);
    })
    .catch(function (error) 
    {
        setSubjectList(undefined);
        setLoading(false);
    });   
}

function getHeader()
{
    let myHeader = [
        { text: 'Sr No', dataField: 'srno'},
        { text: 'Paper Code', dataField: 'paperCode',filter: textFilter()},
        { text: 'Paper Name', dataField: 'paperName',filter: textFilter()},
        { text: 'Delete', dataField: 'delete'},
    ];
    return myHeader;
}

function getData(subjectList,setMyList,myList,setShow,setMsg)
{
    let myData = [];
    let i = 1;
    subjectList.map((data, index) => 
    {
        myData.push({
            srno                    : i++,
            paperCode               : data.paper_code,
            paperName               : data.paper_name,
            delete                  : <button className="btn btn-danger" onClick={()=>{deleteRecord(data.id,setMyList,myList,setShow,setMsg);}}>Delete</button>
        });
    })

    return myData;
}

async function deleteRecord(id,setMyList,myList,setShow,setMsg)
{
    await API.delete('/subject/'+id)
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

export default SubjectList;