import axios from 'axios';
import data from './dataService';

export async function getRewardsFromDb(customerName){
    const customerId = data[customerName]['id'];
    const url = 'http://192.168.1.145:8080/api/'+customerId+'/rewards';
    let res = await axios.get(url);
    let response = res.data;
    console.log("Obtained rewards data for customerId "+ customerId);
    return response;
}

export async function getTransactionsFromDb(customerName){
    const customerId = data[customerName]['id'];
    const url = 'http://192.168.1.145:8080/api/'+customerId+'/transactions';
    let res = await axios.get(url);
    let response = res.data;
    console.log("Obtained transaction data for customerId "+ customerId);
    return response;
}




