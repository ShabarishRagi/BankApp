import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Label, Input, Container } from "reactstrap";
import Select from 'react-select';
import Swal from 'sweetalert2';

function Form() {
  const navigate = useNavigate();

  const loanTypeOptions = [
    { value: "Long_Term_Loan", label: "Long Term Loan" },
    { value: "Emergency_Loan", label: "Emergency Loan" },
    { value: "Group_Activity_Loan", label: "Group Activity Loan" },
    { value: "Business_loan", label: "Business loan" },
  ];

  const loanAccountOptions = [{ value: "new", label: "New Loan Account" }];

  const purposeOptions = [
    { value: "", label: "--Select Purpose of Loan--", isDisabled: true },
    { value: "Business_Purpose", label: "Business Purpose" },
    { value: "College_Education", label: "College Education" },
    { value: "Domestic_Needs", label: "Domestic Needs" },
    { value: "Festival_Expenses", label: "Festival Expenses" },
    { value: "Flat_Purchase", label: "Flat Purchase" },
    { value: "Gold_Purchase", label: "Gold Purchase" },
    { value: "Hospital_Expenses", label: "Hospital Expenses" },
    { value: "House_Purchase", label: "House Purchase" },
    { value: "Marriage_Expenses", label: "Marriage Expenses" },
    { value: "Plot_Purchase", label: "Plot Purchase" },
    { value: "Rice_Purchase", label: "Rice Purchase" },
    { value: "School_Education", label: "School Education" },
    { value: "Self_Employment", label: "Self Employment" },
  ];

  const loanStatusOptions = [
    { value: "", label: "--Loan App Status--", isDisabled: true },
    { value: "UnderProcess", label: "Under Process" },
    { value: "Sanctioned", label: "Sanctioned" },
    { value: "Rejected", label: "Rejected" },
    { value: "LoanIssued", label: "Loan Issued" },
    { value: "LoanCleared", label: "Loan Cleared" },
  ];

  const [receipts, setReceipts] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedMNo, setSelectedMNo] = useState(null);
  const [memberName, setMemberName] = useState('');

  const [loanType, setLoanType] = useState(null);
  const [loanAccount, setLoanAccount] = useState(null);
  const [loanPurpose, setLoanPurpose] = useState(null);
  const [loanAmount, setLoanAmount] = useState('');
  const [noOfInstallments, setNoOfInstallments] = useState('');
  const [installmentAmount, setInstallmentAmount] = useState('');
  const [monthlyROI, setMonthlyROI] = useState('');
  const [loanAppStatus, setLoanAppStatus] = useState(null);
  const [applicationDate, setApplicationDate] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [membershipMonths, setMembershipMonths] = useState('');
  const [totalSavings, setTotalSavings] = useState('');
  const [eligibleLoanAmount, setEligibleLoanAmount] = useState('');
  const [eligibleInstallments, setEligibleInstallments] = useState('');
  
    const [n1Name, setN1Name] = useState('');
  const [n2Name, setN2Name] = useState('');
    const [selectedN1MNo, setSelectedN1MNo] = useState(null);
   const [selectedN2MNo, setSelectedN2MNo] = useState(null);

   const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [bankName, setBankName] = useState('');
    const [ifscCode, setIfscCode] = useState('');




  useEffect(() => {
    fetch("http://localhost/cvmacts/show_mno.php")
      .then((res) => res.json())
      .then((data) => {
        setReceipts(data);
        const selectOptions = data.map((item) => {
            const mNoStr = item.m_no != null ? item.m_no.toString() : '';
            return {
                label: mNoStr,
                value: mNoStr,
            };
        });
        setOptions(selectOptions);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleMNoChange = (selectedOption) => {
  setSelectedMNo(selectedOption);
  const receipt = receipts.find(r => r.m_no.toString() === selectedOption?.value);
  if (receipt) {
    setMemberName(receipt.name || '');
    setAccountNumber(receipt.acntno || '');
    setAccountName(receipt.acntname || '');
    setBankName(receipt.bankname || '');
    setIfscCode(receipt.ifsccode || '');
  } else {
    // Clear bank details if no member found
    setMemberName('');
    setAccountNumber('');
    setAccountName('');
    setBankName('');
    setIfscCode('');
  }
};


  const handleN1MNoChange = (selectedOption) => {
    setSelectedN1MNo(selectedOption);
    const receipt = receipts.find(r => r.m_no.toString() === selectedOption?.value);
    setN1Name(receipt ? receipt.name : '');
  };

  const handleN2MNoChange = (selectedOption) => {
    setSelectedN2MNo(selectedOption);
    const receipt = receipts.find(r => r.m_no.toString() === selectedOption?.value);
    setN2Name(receipt ? receipt.name : '');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const dataToSend = {
    m_no: selectedMNo?.value,
    membername: memberName,
    loanType: loanType?.label, // or .value, depending on what you want to save
    loanAmount,
    noOfInstallments,
    installmentAmount,
    monthlyROI,
    loanAppStatus: loanAppStatus?.value,
    applicationDate,
    issueDate,
    dateOfJoining,
    membershipMonths,
    totalSavings,
    eligibleLoanAmount,
    eligibleInstallments,
    loanAccount: loanAccount?.value,
    loanPurpose: loanPurpose?.label,
    accountNumber,
    accountName,
    bankName,
    ifscCode,
  };

  try {
    const response = await fetch('http://localhost/cvmacts/add_loan.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();

    if (result.success) {
      Swal.fire({
        title: 'Success!',
        text: result.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: result.error || 'Something went wrong',
        icon: 'error',
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.message || 'Network error',
      icon: 'error',
    });
  }
};

  return (
    <div className="page-content">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button onClick={() => navigate('/SavingsList')} className="btn btn-primary">Back</button>
      </div>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <h1>NEW LOAN RECEIPT</h1>
            <Card>
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <div>
                        <Label>Member No</Label>
                        <Select options={options} value={selectedMNo} onChange={handleMNoChange} isClearable />
                      </div>
                      <div>
                        <Label>Member Name</Label>
                        <Input type="text" value={memberName} readOnly />
                      </div>
                      <div>
                        <Label>Loan Type</Label>
                        <Select options={loanTypeOptions} value={loanType} onChange={setLoanType} isClearable />
                      </div>
                      <div>
                        <Label>Loan Account</Label>
                        <Select options={loanAccountOptions} value={loanAccount} onChange={setLoanAccount} />
                      </div>
                      <div>
                        <Label>Loan Purpose</Label>
                        <Select options={purposeOptions} value={loanPurpose} onChange={setLoanPurpose} />
                      </div>
                      <div>
                        <Label>Loan Amount</Label>
                        <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                      </div>
                      <div>
                        <Label>No of Installments</Label>
                        <Input type="number" value={noOfInstallments} onChange={(e) => setNoOfInstallments(e.target.value)} />
                      </div>
                      <div>
                        <Label>Installment Amount</Label>
                        <Input type="number" value={installmentAmount} onChange={(e) => setInstallmentAmount(e.target.value)} />
                      </div>
                      <div>
                        <Label>Monthly ROI</Label>
                        <Input type="number" value={monthlyROI} onChange={(e) => setMonthlyROI(e.target.value)} />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div>
                        <Label>Loan App Status</Label>
                        <Select options={loanStatusOptions} value={loanAppStatus} onChange={setLoanAppStatus} />
                      </div>
                      <div>
                        <Label>Application Date</Label>
                        <Input type="date" value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} />
                      </div>
                      <div>
                        <Label>Issue Date</Label>
                        <Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                      </div>
                      <div>
                        <Label>Date of Joining</Label>
                        <Input type="date" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} />
                      </div>
                      <div>
                        <Label>Membership Months</Label>
                        <Input type="number" value={membershipMonths} onChange={(e) => setMembershipMonths(e.target.value)} />
                      </div>
                      <div>
                        <Label>Total Savings</Label>
                        <Input type="number" value={totalSavings} onChange={(e) => setTotalSavings(e.target.value)} />
                      </div>
                      <div>
                        <Label>Eligible Loan Amount</Label>
                        <Input type="number" value={eligibleLoanAmount} onChange={(e) => setEligibleLoanAmount(e.target.value)} />
                      </div>
                      <div>
                        <Label>Eligible Installments</Label>
                        <Input type="number" value={eligibleInstallments} onChange={(e) => setEligibleInstallments(e.target.value)} />
                      </div>
                    </Col>
                  </Row>

                  <Card>
                    <section>
                        <div className="mt-4">
                            <h5>Nominee Details</h5>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>M.No</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Mship Months</th>
                                    <th>Total Savings</th>
                                    <th>Loan Pending</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr key={1}>
                                    <td><Select options={options} value={selectedN1MNo} onChange={handleN1MNoChange} /></td>
                                    <td><Input type="text" value={n1Name} readOnly /></td>
                                    <td><Input type="text" /></td>
                                    <td><Input type="text" /></td>
                                    <td><Input type="text" /></td>
                                    <td><Input type="text" /></td>
                                    </tr>
                                    <tr key={4}>
                                    <td>
                                        <Select options={options} value={selectedN2MNo} onChange={handleN2MNoChange} /></td>
                                        <td><Input type="text" value={n2Name} readOnly /></td>
                                        <td><Input type="text" /></td>
                                        <td><Input type="text" /></td>
                                        <td><Input type="text" /></td>
                                        <td><Input type="text" /></td>
                                    </tr>          
                                </tbody>
                            </table>
                            </div>
                    </section>
                  </Card>

                  <Card>
                    <section>
                        <div className='justify-content-center mt-4'>
                            <h4 className='justify-content-center'>
                                Bank Account Details
                            </h4>
                            <Row>
                                <Col md={6}>
                                    <div>
                                        <Label>A/C Number</Label>
                                        <Input type="number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)}/>
                                    </div>
                                    <div>
                                        <Label>A/C Name</Label>
                                        <Input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)}/>
                                    </div>
                                </Col>

                                <Col>
                                    <div>
                                        <Label>Bank Name</Label>
                                        <Input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)}/>
                                    </div>
                                    <div>
                                        <Label>IFSC Code</Label>
                                        <Input type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                                    </div>
                                </Col>
                                </Row>

                        </div>
                    </section>
                  </Card>

                  <Row className="justify-content-center mt-4">
                    <Col md={4} className="text-center">
                      <button type="submit" className="btn btn-success">Submit</button>
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
