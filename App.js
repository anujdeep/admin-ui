import { useEffect, useState } from "react";
import MainLayout from "./components/MainLayout/MainLayout";
import {getAllUser} from "./services/UserService";
import Table from "./components/Table/Table";

function App() {
  const [userList,setUserList]=useState([]);
  let [userData,setUserData]=useState([]);
  const [page, setPage] = useState(1);
  const [lastPageSize,setLastPageSize]=useState(10);
  useEffect(()=>{
    (async function() {
      let userList=await getAllUser();
      userList=userList.map((data)=>{
        return {...data,isChecked:false}
      });
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
    
    const startingDataIndex=(page-1)*10;
    // const lastPageDataSize=userData.slice(startingDataIndex).length ;
    const currentPageData=userData.slice(startingDataIndex,lastPageSize);

    const searchedUserData=currentPageData.filter((userData)=>{
      return userData.email.toLowerCase().includes(searchedText.toLowerCase())
      || userData.name.toLowerCase().includes(searchedText.toLowerCase())
      || userData.role.toLowerCase().includes(searchedText.toLowerCase())
    });
    setUserList(searchedUserData);
    
  }

  function deleteUserHandler(userId){
    const filteredData=userList.filter((userData)=>{
      return userData.id!==userId
    });
    const filteredUserData=userData.filter((userData)=>{
      return userData.id!==userId
    })
    setUserList(filteredData);
    setUserData(filteredUserData);
  }

  function selectOrDeselectHandler(value){
    const userData=userList.map((userData)=>{
      return {...userData,isChecked:value}
    })
    setUserList(userData);
    setUserData(userData);
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
    setUserList(filteredData);
    setUserData(filteredUserData);
    console.log("delete multiple users");
  }

  function changePageData(pageNumber){
    setPage(pageNumber)  
  }

  return (
    <div className="App">
      <MainLayout>
        <Table page={page} userList={userList} onInputChange={searchUser} onDeleteUser={deleteUserHandler}
        onSelectOrDeselectAll={selectOrDeselectHandler} onSingleSelectUser={singleSelectUserHandler}
        onUpdateUserData={updateUserDataHandler} onDeleteSelectedUser={deleteAllSelectedUser}
        onChangePage={changePageData}/>
      </MainLayout>
    </div>
  );
}

export default App;
