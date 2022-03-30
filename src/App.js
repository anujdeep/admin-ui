import { useEffect, useState } from "react";
import MainLayout from "./components/MainLayout/MainLayout";
import {getAllUser} from "./services/UserService";
import Table from "./components/Table/Table";

function App() {
  const [userList,setUserList]=useState([]);
  let [userData,setUserData]=useState([]);
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage]=useState(0);
  const [lastPageSize,setLastPageSize]=useState(10);
  useEffect(()=>{
    (async function() {
      let userList=await getAllUser();
      userList=userList.map((data)=>{
        return {...data,isChecked:false}
      });
      setTotalPage(Math.ceil(userList.length/10));
      setUserData(userList);
      setUserList(userList.slice(0,10));
    })()
    
  },[]);
  useEffect(()=>{
    const startingDataIndex=(page-1)*10;
    const dataSizeFromCurrentPage=userData.slice(startingDataIndex).length ;
    const lastPageDataSize=dataSizeFromCurrentPage >=10 ? 
                          (page*10) : startingDataIndex+dataSizeFromCurrentPage;
    setLastPageSize(lastPageDataSize)
    const pageData=userData.slice(startingDataIndex,lastPageDataSize );
    setUserList(pageData);
  },[page,userData])
  
  function searchUser(searchedText){

    const searchedUserData=userData.filter((userData)=>{
      return userData.email.toLowerCase().includes(searchedText.toLowerCase())
      || userData.name.toLowerCase().includes(searchedText.toLowerCase())
      || userData.role.toLowerCase().includes(searchedText.toLowerCase())
    });
    setUserList(searchedUserData.slice(0,lastPageSize));
    
  }

  function deleteUserHandler(userId){
    const filteredData=userList.filter((userData)=>{
      return userData.id!==userId
    });
    const filteredUserData=userData.filter((userData)=>{
      return userData.id!==userId
    })
    setTotalPage(Math.ceil(filteredUserData.length/10));
    setUserList(filteredData);
    setUserData(filteredUserData);
  }

  function selectOrDeselectHandler(value){
    const updatedUserList=userList.map((userData)=>{
      return {...userData,isChecked:value}
    })
    const updatedUserIds=updatedUserList.map((userData)=>userData.id);
    const updatedUserData=userData.map((userData)=>{
      if(updatedUserIds.includes(userData.id)){
        return {...userData,isChecked:value};
      }
      else
      return userData;
    })
    setUserList(updatedUserList);
    setUserData(updatedUserData);
  }

  function singleSelectUserHandler(data){
    const checkedUserList=userList.map((userData)=>{
      return userData.id===data.target.value ? {...userData,isChecked:data.target.checked} : userData
    })
    const checkedUserData=userData.map((userData)=>{
      return userData.id===data.target.value ? {...userData,isChecked:data.target.checked} : userData
    })
    setUserList(checkedUserList);
    setUserData(checkedUserData);
  }

  function updateUserDataHandler(updatedUserData){
    const filteredData=userList.map((user)=>{
      return user.id===updatedUserData.id ? {...updatedUserData} : user;
    });
    const filteredUserData=userData.map((user)=>{
      return user.id===updatedUserData.id ? {...updatedUserData} : user;
    })
    setUserList(filteredData);
    setUserData(filteredUserData);
  }

  function deleteAllSelectedUser(){
    const filteredData=userList.filter((userData)=>{
      return !userData.isChecked
    });
    const filteredUserData=userData.filter((userData)=>{
      return !userData.isChecked
    })
    setTotalPage(Math.ceil(filteredUserData.length/10));
    setUserList(filteredData);
    setUserData(filteredUserData);
  }

  function changePageData(pageNumber){
     
    const filteredData=userList.map((userData)=>{
      return {...userData,isChecked:false}
    });
    const filteredUserData=userData.filter((userData)=>{
      return {...userData,isChecked:false}
    })
    setUserList(filteredData);
    setUserData(filteredUserData);
    setPage(pageNumber) 
  }

  return (
    <div className="App">
      <MainLayout>
        <Table page={page} totalPage={totalPage} userList={userList} onInputChange={searchUser} onDeleteUser={deleteUserHandler}
        onSelectOrDeselectAll={selectOrDeselectHandler} onSingleSelectUser={singleSelectUserHandler}
        onUpdateUserData={updateUserDataHandler} onDeleteSelectedUser={deleteAllSelectedUser}
        onChangePage={changePageData}/>
      </MainLayout>
    </div>
  );
}

export default App;
