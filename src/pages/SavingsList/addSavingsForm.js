import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Label, Input, Container } from "reactstrap";
import Select from 'react-select';
import Swal from 'sweetalert2';
import { FiPlus } from 'react-icons/fi';

function Form() {
  const navigate = useNavigate();

  const options1 = [
  { value: 1, label: "Monthly Savings" },
  { value: 2, label: "Admission Fee" },
  { value: 3, label: "Form Sales" },
  { value: 4, label: "Donation Fund", isDisabled: true },
  { value: 5, label: "Insurance Policy", isDisabled: true },
  { value: 6, label: "Share Capital", isDisabled: true },
  { value: 7, label: "Deposit Amount", isDisabled: true },
];


  const options2 = [
  { value: 1, label: "Cash" }, // 1 is the code for Cash
  { value: 2, label: "UPI" },  // 2 is the code for UPI
];
  
  // Store all receipts for lookup
  const [receipts, setReceipts] = useState([]);
  // m_no select options
  const [options, setOptions] = useState([]);
  // Selected m_no
  const [selectedMNo, setSelectedMNo] = useState(null);
  // Member name (auto-filled)
  const [memberName, setMemberName] = useState('');

  // Other form fields
  const [selectedReceiptTowards, setSelectedReceiptTowards] = useState(null);
  const [selectedTransactionType, setSelectedTransactionType] = useState(null);
  const [amount, setAmount] = useState("");
  const [lateFee, setLateFee] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [lastPaidDate, setLastPaidDate] = useState("");
  const [entryBy, setEntryBy] = useState("");




  // Calculate total amount = amount + late fee
  const parseNumber = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };
  const totalAmount = parseNumber(amount) + parseNumber(lateFee);

  // Fetch receipts on mount
  useEffect(() => {
    fetch("http://localhost/cvmacts/show_reciepts.php")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setReceipts(data);
        // Unique m_no options
        const selectOptions = data.map((item) => ({
          label: item.m_no.toString(),
          value: item.m_no.toString(),
        }));
        setOptions(selectOptions);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // When m_no changes, update member name
  const handleMNoChange = (selectedOption) => {
    setSelectedMNo(selectedOption);

    if (!selectedOption) {
      setMemberName('');
      return;
    }

    const receipt = receipts.find(r => r.m_no.toString() === selectedOption.value);
    setMemberName(receipt ? receipt.membername : '');
  };

  // Handlers for selects
  const handleReceiptTowardsChange = (option) => setSelectedReceiptTowards(option);
  const handleTransactionTypeChange = (option) => setSelectedTransactionType(option);

  const resetForm = () => {
  setReceiptDate('');
  setSelectedMNo(null);
  setMemberName('');
  setSelectedReceiptTowards(null);
  setLastPaidDate('');
  setAmount('');
  setLateFee('');
  setSelectedTransactionType(null);
  setEntryBy('');
};

  // Form submission
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!receiptDate) {
    alert("Please select Receipt Date");
    return;
  }
  if (!selectedMNo) {
    alert("Please select Member No");
    return;
  }
  if (!lastPaidDate) {
    alert("Please select Last Paid Date");
    return;
  }
  if (totalAmount <= 0) {
    alert("Total Amount must be greater than zero");
    return;
  }
  Swal.fire({
    title: 'Success!',
    text: 'Form submitted successfully.',
    icon: 'success',
    confirmButtonText: 'OK'
  }).then(()=>{
    resetForm();
  });
  const dataToSend = {
  company_id: 270601,
  receipt_date: receiptDate,
  m_no: selectedMNo.value,
  membername: memberName,
  towardscode: selectedReceiptTowards ? selectedReceiptTowards.id || selectedReceiptTowards.value : null, // see note below
  towards: selectedReceiptTowards ? selectedReceiptTowards.label : "",
  amount: parseFloat(amount) || 0,
  latefee: parseFloat(lateFee) || 0,
  totalamount: parseFloat(totalAmount) || 0,
  trantypecode: selectedTransactionType?.value,// <-- code
  trantypename: selectedTransactionType ? selectedTransactionType.label : "",   // <-- name
  lastpaiddate: lastPaidDate,
  entryby: entryBy,
};


  console.log("Submitting data:", dataToSend);

   try {
    const response = await fetch('http://localhost/add_receipt.php', {
      method: 'POST', // <-- Must be POST
      headers: {
        'Content-Type': 'application/json', // <-- JSON content type
      },
      body: JSON.stringify(dataToSend), // <-- Send JSON body
    });

    const result = await response.json();

    if (!response.ok) {
      alert('Error: ' + (result.error || 'Unknown error'));
      return;
    }

    // Navigate or reset form as needed
  } catch (error) {
    alert('Network error: ' + error.message);
  }

};


  return (
    
    <div className='page-content'>
      <div
  style={{
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
    width: '100%',
  }}
>
  <button
    onClick={() => navigate('/SavingsList')}
    style={{
      backgroundColor: 'blue',
      color: 'white',
      padding: '6px 12px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '4px',
    }}
  >
    Back
  </button>
</div>
      <Container fluid>
        <Row>
          <Col xs={12}>
                          <h1>Savings List</h1>

            <Card>
              <CardBody>

                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label htmlFor="receipt-date-input">Receipt Date</Label>
                        <Input
                          id="receipt-date-input"
                          type="date"
                          value={receiptDate}
                          onChange={(e) => setReceiptDate(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="mno-select">Member No</Label>
                        <Select
                          inputId="mno-select"
                          options={options}
                          value={selectedMNo}
                          onChange={handleMNoChange}
                          placeholder="Select m_no"
                          classNamePrefix="select2-selection"
                          isClearable
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="membername-input">Member Name</Label>
                        <Input
                          id="membername-input"
                          type="text"
                          placeholder="Member Name"
                          value={memberName}
                          readOnly
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="receipt-towards-select">Select Receipt Towards</Label>
                        <Select
                          inputId="receipt-towards-select"
                          options={options1}
                          value={selectedReceiptTowards}
                          onChange={handleReceiptTowardsChange}
                          placeholder="Select receipt towards"
                          classNamePrefix="select2-selection"
                          isClearable
                        />
                      </div>
                    

                    {/* Right Column - Next 4 Fields */}
                    
                      <div className="mb-3">
                        <Label htmlFor="lastpaid-date-input">Last Paid Date</Label>
                        <Input
                          id="lastpaid-date-input"
                          type="date"
                          value={lastPaidDate}
                          onChange={(e) => setLastPaidDate(e.target.value)}
                          required
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label htmlFor="amount-input">Amount</Label>
                        <Input
                          id="amount-input"
                          type="number"
                          min="0"
                          step="0.01"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Amount"
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="latefee-input">Late Fee</Label>
                        <Input
                          id="latefee-input"
                          type="number"
                          min="0"
                          step="0.01"
                          value={lateFee}
                          onChange={(e) => setLateFee(e.target.value)}
                          placeholder="Late Fee"
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="totalamount-input">Total Amount</Label>
                        <Input
                          id="totalamount-input"
                          type="number"
                          value={totalAmount.toFixed(2)}
                          readOnly
                          placeholder="Total Amount"
                        />
                      </div>

                      <div className='mb-3'>
                        <Label htmlFor='Transaction Type'>Transaction Type</Label>
                        <Select
                          options={options2} // [{ value: 1, label: "Cash" }, ...]
                          value={selectedTransactionType}
                          onChange={handleTransactionTypeChange}
                        />
                      </div>

                      <div className='mb-3'>
                        <Label htmlFor='Entry by'>Entry By</Label> 
                        <Input
                          id="entryby-input"
                          type="text"
                          placeholder="Entry By"
                          value={entryBy}
                          onChange={(e) => setEntryBy(e.target.value)}
                          required
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="justify-content-center mt-4">
                    <Col md={4} className="text-center">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default Form;

