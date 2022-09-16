import { User } from "../../features/userListSlice";

type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
    kind: ResponseKind;
    body?: T;
}

export const fetchUsers = async (
    page:number,
    count: number,
    ) :Promise<NetworkResponse<User[]>> => {
        const response = await fetch(`https://randomuser.me/api/?${page}&results=${count}`,
        {

            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                

            },
            mode:'cors'
        }
        
        );
        if (response.ok){
            const json = await response.json();
            return {
                kind: 'success',
                body: json.results
            }   
        } else{
            return {
                kind: 'failure'
            }
        }


    
}