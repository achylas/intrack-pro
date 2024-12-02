import React from 'react';

import { ref,onValue } from 'firebase/database';
import { Table } from 'react-bootstrap';
//Calling Firebase config setting to call the data
import firebase from 'firebase/compat/app';
import { db } from '../loginsignup/firebase';
const db = StartFirebase();

class Testscreen extends React.Component {

constructor() {
    
    super();
   
    this.state = {studentslist : []}
    }
    componentDidMount(){
        const dbref=ref(db,"students");
        onValue(dbref, (snapshot)=>
        {
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key":keyName, "data": data});
            });
            this.setState({tableData:records});
        }
        )
    }
    
render(){
    return(
        <Table>
            <thead>
                <tr>
                    <th>#</th> 
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Reg no.</th>
                    <th>Advisor Id</th>
                </tr>
            </thead>
           
           <tbody>
            {this.state.tableData.map((row,index)=>{
                return(
                    <tr>
                        <td>(index)</td>
                        <td>(row.key)</td>
                        <td>(row.data.Username)</td>
                        <td>(row.data.email)</td>
                        <td>(row.data.studentID)</td>
                        <td>(row.data.advisorID)</td>

                    </tr>
                )
            })}
           </tbody>


        </Table>
    )
}

    
 }
  
  

export default Testscreen;