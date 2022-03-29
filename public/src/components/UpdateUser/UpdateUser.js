
import classes from "./UpdateUser.module.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
function UpdateUser(props){
    const [userName,setUserName]=useState('');
    const [userRole,setUserRole]=useState('');
    const [userEmail,setUserEmail]=useState('');
    useEffect(()=>{
        setUserName(props.userToEdit.name);
        setUserRole(props.userToEdit.role);
        setUserEmail(props.userToEdit.email);
    },[props.userToEdit]);
    function submitHandler(event){
        event.preventDefault();
        
        const updatedUserData={
            name:userName,
            email:userEmail,
            role:userRole,
            id:props.userToEdit.id
        }
        props.onUpdateData(updatedUserData);
        props.onCloseModal()
    }
    return (
        <>
        <Modal
        open={props.openModal}
        onClose={props.onCloseModal}
        >
            <Box className={classes.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                Edit User Details
            </Typography>
            
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name:</label>
                <input type="text" value={userName} id="name" required
                onChange={(e)=>setUserName(e.target.value)}/>
                <label htmlFor="email">Email:</label>
                <input type="email" value={userEmail} id="email" required
                onChange={(e)=>setUserEmail(e.target.value)}/>
                <label htmlFor="role">Role:</label>
                <input type="text" value={userRole} id="role" required
                onChange={(e)=>setUserRole(e.target.value)}/>
                <button className={classes.submitBtn}>Submit</button>
            </form>
            </Box>
        </Modal>
        </>
    )
}
export default UpdateUser;