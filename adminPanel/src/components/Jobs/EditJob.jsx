import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleJob } from '../services/jobsService'

const EditJob = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const [selectedJob, setSelectedJob]=useState([])
    useEffect(()=>{
        const fetchData=async ()=>{
            const response= await getSingleJob(id)
            setSelectedJob(response)
        }
        fetchData()

    },[])
  return (
    <div>
        <h1>
            {selectedJob.title}
        </h1>
    </div>
  )
}

export default EditJob