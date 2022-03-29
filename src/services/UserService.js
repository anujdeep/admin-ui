import {url} from "./../config";
export async function getAllUser(){
    try{
        const userData=await fetch(url.href);
        let res= await userData.json();
        return res;
    }
    catch(error){
        return [];
    }

}
