import classes from "./DeleteUser.module.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function DeleteUser(props){
    function submitHandler(event){
        event.preventDefault();
        console.log("delete selected users");
        props.onCloseModal()
        props.onConfirmDelete()
    }
    let content=''
    if(props.selectedForDeletion===0)
    content=<h3>Please select users to delete first</h3>
    else{
        content=<>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
        Are you sure,you want to delete {props.selectedForDeletion} users ?
    </Typography>
    <form onSubmit={submitHandler}>
        <button className={classes.cancelBtn} onClick={()=>props.onCloseModal()}>Cancel</button>
        <button className={classes.deleteBtn}>Delete</button>
    </form>
    </>
    }
    return (
        <>
        <Modal
        open={props.openModal}
        onClose={props.onCloseModal}
        >
            <Box className={classes.modal}>
            {content}
            </Box>
        </Modal>
        </>
    )
}
export default DeleteUser;