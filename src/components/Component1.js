import { Box, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


import LinearProgress from '@mui/material/LinearProgress';



import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Pagination, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    '@media (min-width: 780px)': {
        width: '80%'
    },

    mainbox1: {
        width: "100%",
        minHeight: "fit-content",
        marginBottom: 10,

    },
    box1: {
        height: "100%",
        width: "100%",
        border: "2px solid black",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 20,
        backgroundImage: "linear-gradient(0deg,#8a3aff,#1eff4c)",
    },

    postsEle: {
        '&:hover': {
            cursor: "pointer",
        },
    },

    postsEleTitle: {
        color: "black",
        textDecoration: "none",
        '&:hover': {
            textDecoration: "underline",
        },
    },
    dashboard1: {
        width: "100%",
        height: 100,
        backgroundImage: "linear-gradient(60deg,#ff3a7c,#741eff)",
        display: "flex",
        justifyContent: "center"
    }



}));











const Component1 = () => {

    const classes = useStyles();

    //set whether post data is fetching
    const [postLoading, setPostLoading] = useState(false);
    //container for storing data when fetched
    const [postData, setPostData] = useState([]);
    //container for storing data when fetched 2 used for pagination
    const [displayPostData, setDisplayPostData] = useState([]);
    //Render key to render the main div after update
    const [renderKey, setRenderKey] = useState(0);

    //function to fetch data
    const handlePost = async () => {
        setPostLoading(false);
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPostData(data);
        setDisplayPostData(data);
        console.log(data)
        setPostLoading(true);
    }

    useEffect(() => {
        handlePost();
    }, [])




    //Pagination Part

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = displayPostData.slice(indexOfFirstPost, indexOfLastPost);




    //Coment Popup Part
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const [CommentLists, setCommentLists] = useState([])
    const handleClose = () => {
        setCommentOpen(false);
    };

    //fetching comments
    const handleCommentArray = async (id1) => {
        setCommentLoading(false);
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id1}/comments`);
        console.log(data)
        setCommentLists(data);
        setCommentLoading(true);
    }


    const handleCommentClick = (e) => {
        setCommentOpen(true);
        handleCommentArray(e.target.id);
    }


    //Sorting part
    const [sortValue, setSortValue] = React.useState('');

    const handleChange = (event) => {
        setSortValue(event.target.value);
    };



    const com = (item1, item2) => {
        if (item1.title < item2.title) {
            return -1;
        }
        else {
            return 1;
        }
    }
    const com2 = (item1, item2) => {
        if (item1.body < item2.body) {
            return -1;
        }
        else {
            return 1;
        }
    }

    useEffect(() => {
        if (sortValue === 10) {
            displayPostData.sort(com);
        } else if (sortValue === 20) {
            displayPostData.sort(com2);
        } else {
            setDisplayPostData(postData);
        }
        setRenderKey(Math.random());
    }, [sortValue])







    return (
        <>

            <div className={classes.dashboard1}>
                <h4>Sort by Order : </h4>
                <FormControl sx={{ m: 1, minWidth: 120 }} style={{ width: "40%", backgroundColor: "white", height: 54 }}>
                    <Select
                        value={sortValue}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Sort by Name</MenuItem>
                        <MenuItem value={20}>Sort by Paragraph</MenuItem>
                    </Select>


                </FormControl>

            </div>

            <div style={{ display: "none" }}>
                <Dialog open={commentOpen} onClose={handleClose} >
                    <DialogTitle>Comments</DialogTitle>
                    <DialogContent >


                        {
                            (!commentLoading) ? (
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                            ) : (
                                <>
                                    {
                                        CommentLists.map((item, index) => {

                                            return (
                                                <DialogContent key={item.id} style={{ border: "1px solid black" }}>
                                                    <DialogContentText style={{ fontSize: 18, color: "black", marginBottom: 12 }}>{item.name}</DialogContentText>
                                                    <DialogContentText style={{ marginBottom: 12 }}>{item.email}</DialogContentText>
                                                    <DialogContentText>{item.body}</DialogContentText>
                                                </DialogContent>
                                            )

                                        })
                                    }
                                </>



                            )
                        }







                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Done</Button>
                    </DialogActions>
                </Dialog>
            </div>

            {
                (!postLoading) ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <>
                        <div className={classes.mainbox1} key={renderKey}>
                            <div className={classes.box1}>
                                {
                                    currentPosts.map((item, index) => {

                                        return (
                                            <div key={item.id} className={classes.postsEle} style={{ border: "5px solid black", width: 383, height: "22%", padding: 10, backgroundColor: "white" }}>
                                                <Link className={classes.postsEleTitle} id={item.userId} to={"/info/" + item.id} target="_black">{item.title}</Link>
                                                <p>{item.body}</p>
                                                <Stack spacing={2} direction="row">

                                                    <Button variant="contained" id={item.id} onClick={handleCommentClick}>Comments</Button>

                                                </Stack>
                                            </div>
                                        )

                                    })
                                }
                            </div>



                        </div>
                        <div style={{ height: 62, width: "94%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Stack spacing={2}>

                                <Pagination count={10} color="primary"
                                    onChange={(e, value) => { setCurrentPage(value) }}
                                />


                            </Stack>
                        </div>
                    </>

                )


            }



        </>
    )
}

export default Component1