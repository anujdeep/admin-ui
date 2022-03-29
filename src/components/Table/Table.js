import classes from "./Table.module.css";
import SearchBox from "../UI/SearchBox/SearchBox";
import UpdateUser from "../UpdateUser/UpdateUser";
import DeleteUser from "../DeleteUser/DeleteUser";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import Pagination from '@mui/material/Pagination';
import { useState } from "react";
function Table(props){
    const [selectedOrDeselected,setSelectedOrDeselected]=useState(false);
    const [open, setOpen] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userToEdit,setUserToEdit]=useState([]);
    
    const changePage = (event, value) => {
        props.onChangePage(value);
    };
    const searchBox=<SearchBox onInputChange={searchUser} placeholder="Search by name, email or role"/>
    
    function searchUser(searchedText){
        props.onInputChange(searchedText);

    }

    function deleteHandler(userId){
        props.onDeleteUser(userId);
    }

    function deleteSelectedUser(){
        setOpenDeleteModal(true);
    }

    function selectOrDeselectAll(){
        
        props.onSelectOrDeselectAll(!selectedOrDeselected);
        setSelectedOrDeselected((prevState)=>!prevState);
        
    }

    function selectOrDeselectUser(event){
        props.onSingleSelectUser(event);
    }

    function openModalHandler(userData){
        setOpen(true);
        setUserToEdit(userData);
    }   

    function updateUserData(userData){
        props.onUpdateUserData(userData);
    }  
     
    if(props.userList.length===0)
    return (
        <>
        {searchBox}
        <div className={classes.fallBack}>
            No User Found. Please try again !!!
        </div>
        </>
    )
    return (
        <>
        {searchBox}
        <UpdateUser openModal={open} onCloseModal={()=>setOpen(false)} 
        userToEdit={userToEdit} onUpdateData={updateUserData}/>
        <DeleteUser openModal={openDeleteModal} onCloseModal={()=>setOpenDeleteModal(false)}
         selectedForDeletion={props.userList.filter(data=> data.isChecked).length}
         onConfirmDelete={()=>props.onDeleteSelectedUser()}/>
        <table className={classes.users}>
            <thead>
            <tr>
            <th><input type="checkbox" value={selectedOrDeselected}
             onClick={selectOrDeselectAll} /></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
           </thead>
           <tbody>
            {props.userList.map((user)=>{
                return (
                <tr key={user.id}>
                    <td><input type="checkbox" value={user.id} checked={ user.isChecked} 
                    onChange={selectOrDeselectUser}/></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <ModeEditOutlinedIcon className={classes.editBtn} 
                        onClick={()=>openModalHandler(user)}/>
                        <DeleteOutlineIcon className={classes.deleteBtn} 
                        onClick={()=>deleteHandler(user.id)}/>
                    </td>
                </tr>
                    )
            })}
            </tbody>
        </table>
        <div style={{display:"flex",marginTop:"20px"}}>
        <button className={classes.deleteSelectedBtn} onClick={deleteSelectedUser}>Delete Selected</button>
        <Pagination count={5} color="secondary" sx={{ml:50}} page={props.page} onChange={changePage} showFirstButton showLastButton/>
        </div>
        </>
    )
}
export default Table;
