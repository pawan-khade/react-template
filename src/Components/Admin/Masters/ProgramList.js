import React,{useState,useEffect,useContext} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import API from '../../../api';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {ShowContext} from '../../../App';

const ProgramList = (props) => 
{
    const {setShow,setMsg}                          =   useContext(ShowContext);
    let role                                        =   props.role;
    let [loading, setLoading]                       =   useState(true);
    let [programList, setProgramList]               =   useState([]);
    const header                                    =   getHeader(programList);
    const data                                      =   getData(programList,props.setMyList,props.myList,setShow,setMsg);
    

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
        getUsers(setProgramList,setLoading);
    },[props.myList,role]);

    return (
        programList.length > 0 && !loading ?
        <div className="col-lg-12" style={{overflow:"auto"}}>
            <BootstrapTable keyField='srno' data={ data } columns={ header } filter={ filterFactory() } pagination={ paginationFactory(options) }/>
        </div>
        :   
        null
    );
};

async function getUsers(setProgramList,setLoading)
{
    await API.get('/program',{params:{'type':'all'}})
    .then(function (res) 
    {
        setProgramList(res.data.data);
        setLoading(false);
    })
    .catch(function (error) 
    {
        setProgramList(undefined);
        setLoading(false);
    });   
}

function getHeader(programList)
{
    let myHeader = [
        { text: 'Sr No', dataField: 'srno'},
        { text: 'Program Code', dataField: 'programCode',filter: textFilter()},
        { text: 'Program Name', dataField: 'programName',filter: textFilter()},
        { text: 'Delete', dataField: 'delete'},
    ];
    return myHeader;
}

function getData(programList,setMyList,myList,setShow,setMsg)
{
    let myData = [];
    let i = 1;

    programList.map((data, index) => 
    {
        myData.push({
            srno                    : i++,
            programCode             : data.program_code,
            programName             : data.program_name,
            delete                  : <button className="btn btn-danger" onClick={()=>{deleteRecord(data.id,setMyList,myList,setShow,setMsg);}}>Delete</button>
        });
    })

    return myData;
}

async function deleteRecord(id,setMyList,myList,setShow,setMsg)
{
    await API.delete('/program/'+id)
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

export default ProgramList;