import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import data from './api/dataService';
import {getRewardsFromDb, getTransactionsFromDb} from "./api/dbPopulation";

function App() {
  const [loadedData, setloadedData] = useState([]);
  const [userRewards, setCalcRewards] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    console.log('Starting APP');
    setUsers([...Object.keys(data)]);
    console.log('Ready APP');
  }, []);


  const userSelect = async (value) => {
    try {
      setCurrentUser(value);
      await setCalcRewards(await getRewardsFromDb(value));
      console.log("UserRewards");
      console.log(userRewards);

      await setloadedData(await getTransactionsFromDb(value));
      console.log("LoadedData");
      console.log(loadedData);

      await setUserTransactions(await getTransactionsFromDb(value));
      console.log("TransactionsData");
      console.log(userTransactions);

    } catch (error) {
      console.error(error);
    }

  };

  return (
      //username 8character
      <div style={{
        marginTop: "20px",
        marginBottom: "50px",
        fontSize: "20px",
      }}>
        <h2 style={{ textAlign: "center" }}>User Rewards Dashboard</h2>
        <div className="select-style">
          <select onChange={e => userSelect(e.target.value)} value={currentUser} >
            <option value="" disabled>Select User</option>
            {users.map((item, index) => {
              return (
                  <option key={index} value={item}> {item.toUpperCase()} </option>
              );
            })}
          </select>
        </div>
        {Object.keys(userRewards).length > 0 &&
            <Fragment>
              <table className="customers">
                <thead>
                <tr>
                  <th>Month</th>
                  <th>Rewards</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>First Month</td>
                  <td>{userRewards["lastMonthRewardPoints"]}</td>
                </tr>
                <tr>
                  <td>Second Month</td>
                  <td>{userRewards["lastSecondMonthRewardPoints"]}</td>
                </tr>
                <tr>
                  <td>Third Month</td>
                  <td>{userRewards["lastThirdMonthRewardPoints"]}</td>
                </tr>
                <tr>
                  <td>Total Reward</td>
                  <td>{userRewards["totalRewards"]}</td>
                </tr>
                </tbody>
              </table>
              <h2 style={{ textAlign: "center" }}>User Transactions Dashboard</h2>
              {userTransactions.length > 0 ?
                  <table className="customers">
                    <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction Id</th>
                      <th>Amount</th>
                      <th>Rewards</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userTransactions.map((item, index) => {
                      return <tr key={index}>
                        <td>{item["transaction"]["transactionDate"]}</td>
                        <td>{item["transaction"]["transactionId"]}</td>
                        <td>{item["transaction"]["transactionAmount"]}</td>
                        <td>{item["reward"]}</td>
                      </tr>
                    })}
                    </tbody>
                  </table>
                  : <div>No Transactions Found</div>}
            </Fragment>
        }
      </ div >
  );
}

export default App;