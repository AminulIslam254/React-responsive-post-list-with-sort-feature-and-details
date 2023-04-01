import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';

const InfoPage = () => {

    const { id } = useParams();

    const [userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    //fetching data
    const handleData = async () => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        console.log(data);
        setUserDetails(data);
        setLoading(true);
    }

    useEffect(() => {
        handleData();
    }, [])



    return (
        <>
            {

                (!loading) ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <div>

                        <div style={{width:"100%"}}>
                            <div style={{ width: "100%", height: 170, backgroundColor: "#9a9aff", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <span style={{ fontSize: 30, fontWeight: "bolder" }}>USER DETAILS</span>
                            </div>
                            <div style={{ width: "25%",display:"flex",justifyContent:"center" }}>
                                <h1>{userDetails.name}</h1>
                            </div>

                            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly" ,flexWrap:"wrap"}}>
                                <div style={{ border: "5px solid black", borderRadius: 10, width: 550,marginBottom:10 }}>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><h2>Personal Details</h2></div>
                                    <div style={{ width: "100%", display: "flex", marginLeft: 10, flexDirection: "column" }}>
                                        <p>Username:- {userDetails.username}</p>
                                        <h3>Email:- {userDetails.email}</h3>
                                        <h3>Street Address:- {userDetails.address.street}</h3>
                                        <h3>Suite Address:- {userDetails.address.suite}</h3>
                                        <h3>City :- {userDetails.address.city}</h3>
                                        <h3>Zip Code :- {userDetails.address.zipcode}</h3>
                                    </div>
                                </div>
                                <div style={{ border: "5px solid black", borderRadius: 10, width: 550,marginBottom:10}}>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><h2>Company Details</h2></div>
                                    <div style={{ width: "100%", display: "flex", marginLeft: 10, flexDirection: "column" }}>
                                        <h3>Phone No:- {userDetails.phone}</h3>
                                        <h3>Company Website:- {userDetails.website}</h3>
                                        <h3>Company Name:- {userDetails.company.name}</h3>
                                        <h3>Company Catch Phrase:- {userDetails.company.catchPhrase}</h3>
                                        <h3>Company BS:- {userDetails.company.bs}</h3>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                )

            }



        </>
    )
}

export default InfoPage