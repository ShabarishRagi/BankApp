// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ReceiptsList() {
//   const [receipts, setReceipts] = useState([]);

// //   function getUserAccount() {
// //     alert();
// //   return axios.get('http://localhost/show_reciepts.php');
// // // http://localhost/show_reciepts.php
// // }


//   useEffect(() => {

//       const fetchReciepts = async () =>{
//         try{
//           const response= await fetch('http://localhost/show_reciepts.php');
//           const data= await response.json();

//           setReceipts(data);
//           console.log(data,"Data");
          
//         }
//         catch(err){
//           console.log(err,"Error found");
          
//         }
//       }
//       fetchReciepts();

//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <br/>
//             <br/>

//       <h2>Receipts</h2>
//       {Array.isArray(receipts) && receipts.length === 0 ? (
//         <p>No receipts found.</p>
//       ) : (
//         <ul>
//           { Array.isArray(receipts) && receipts.map((r) => (
//             <li key={r.receipts_id}>
//               <strong>{r.membername}</strong> (#{r.m_no}) paid <strong>{r.amount}</strong> towards <em>{r.towards}</em> on {r.receipt_date} by {r.entryby}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ReceiptsList;





import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiPlus, FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function ReceiptsList() {
  const [receipts, setReceipts] = useState([]);
    const navigate = useNavigate(); // <-- hook for navigation


  useEffect(() => {
    const fetchReceipts = async () => {
      try{
           const response= await fetch('http://localhost/cvmacts/show_reciepts.php');
           const data= await response.json();

           setReceipts(data);
           console.log(data,"Data");
          
         }
         catch(err){
           console.log(err,"Error found");
          
        }
    };

    fetchReceipts();
  }, []);

  const columns = [
    { name: 'Member Name', selector: row => row.membername, sortable: true },
    { name: 'Member No.', selector: row => row.m_no, sortable: true },
    { name: 'Amount', selector: row => row.amount, sortable: true },
    { name: 'Towards', selector: row => row.towards, sortable: true },
    { name: 'Receipt Date', selector: row => row.receipt_date, sortable: true },
    { name: 'Entry By', selector: row => row.entryby, sortable: true },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <br/>
      <br/>
      <br/>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        width: '100%',
      }}>
        <h2>Receipts</h2>
        <div>
          <button onClick={()=> navigate('/SavingsForm') }
          style={{ backgroundColor: 'blue',color: 'white', marginRight: '10px', padding: '6px 12px', cursor: 'pointer' }}>
            <FiPlus style={{ marginRight: '5px' }} />
            Add
          </button>
          <button style={{ backgroundColor: 'red',color: 'white',padding: '6px 12px', cursor: 'pointer' }}>
            <FiEdit style={{ marginRight: '5px' }} />
            Edit
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={Array.isArray(receipts) ? receipts : []}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}

export default ReceiptsList;
