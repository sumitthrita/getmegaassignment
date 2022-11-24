import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../AuthContext';
import List from '../List';
import GraphOne from './GraphOne';

// import { collection, getDocs, getFirestore } from "firebase/firestore"; 
// import { app } from '../../firebase';

const Account = props => {
    const [dataToRender, setDataToRender] = useState([])
    const [searchString, setSearchString] = useState("")
    const [page, setPage] = useState("table")
    const headers = ["company", "country", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
    

    const { user, allData, getData } = UserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        getData()
    },[])

    useEffect(() => {
        if(allData){
            let data = [...allData]
            let companies = new Set()
            let uniqueData = []
            data.forEach(e => {
                if(companies.has(e.company)){

                } else {
                    uniqueData.push(e)
                    companies.add(e.company)
                }
            })
            setDataToRender([...uniqueData])
        }
    },[allData])

    useEffect(() => {
        if(user == null || user == undefined){
            navigate("/")
        }
    },[user])



    const rowValues = () => {
        let rowValue = []
        let filterData = [...dataToRender]
        if(searchString !== ""){
            filterData = filterData.filter(e => {
                if(e.company.toLowerCase().includes(searchString) || e.country.toLowerCase().includes(searchString)){
                    return true;
                } 
            })
        }
        filterData.forEach(eData => {
            let row = []
            headers.forEach(e => {
                row.push(eData[e])
            })
            rowValue.push(row)
        })
        return rowValue
    }

    const handleClick = () => {
        if(page === "table"){
            setPage("graph")
        } else if(page === "graph"){
            setPage("table")
        }
        setSearchString("")
    }

    return (
        <div className='account_page' >
            <div className='account_header'>
                <div className='title' >Welcome <span> {user?.displayName} </span></div>
                <div className='show_graph_btn' onClick={handleClick} >{page === "table" ? "View Graph" : "View Table"} </div>
            </div>
            {page === "table" && <div>
                <div className='search_bar'>
                    <input type="text" value={searchString} placeholder="Search by company or country name" onChange={(e) => setSearchString(e.target.value)} />
                </div>
                {rowValues().length > 0 ?
                    <List headers={headers} values={rowValues()} />
                :   
                    <div className='no_list'>No data with <span> {searchString} </span> </div>
                }
            </div>}
            {page === "graph" && dataToRender && dataToRender.length > 0 &&
                <GraphOne finalData={dataToRender} />
            }
        </div>
    )
}

export default Account;