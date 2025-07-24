import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiPlus, FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function ReceiptsList() {
  const [receipts, setReceipts] = useState([]);
    const navigate = useNavigate(); // <-- hook for navigation

    const handleEdit = (row) => {
       // Show the modal or form
};
  useEffect(() => {
    const fetchReceipts = async () => {
      try{
           const response= await fetch('http://localhost/cvmacts/show_Loan.php');
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
    { name: 'Loan ID', selector: row => row.loan_id, sortable: true },
{ name: 'Member No.', selector: row => row.mno, sortable: true },
{ name: 'Member Name', selector: row => row.mname, sortable: true },
{ name: 'Account No.', selector: row => row.accountno, sortable: true },
{ name: 'Issue Date', selector: row => row.issuedate, sortable: true },
{ name: 'Issue Amount', selector: row => row.issueamount, sortable: true },
{ name: 'Loan Type', selector: row => row.typename, sortable: true },
{ name: 'Surety 1 M.No', selector: row => row.surity1mno, sortable: true },
{ name: 'Surety 2 M.No', selector: row => row.surity2mno, sortable: true },
{
  name: 'Actions',
  cell: row => (
    <div
      onClick={() => handleEdit(row)}
      className="ri-edit-box-line"
    >
    </div>
  ),
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
}
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
        <h2>Loan Application List</h2>
        <div>
          <button onClick={()=> navigate('/LoanListAdd') }
          style={{ backgroundColor: 'blue',color: 'white', marginRight: '10px', padding: '6px 12px', cursor: 'pointer' }}>
            <FiPlus style={{ marginRight: '5px' }} />
            Add
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
