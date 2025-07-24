import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Label, Input, Container } from "reactstrap";
import Select from 'react-select';
import Swal from 'sweetalert2';
import { FiPlus } from 'react-icons/fi';

function Form() {
  const navigate = useNavigate();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reportsType,selectedReportsType] = useState(null);
    const [reportSummary, setReportSummary] = useState(null);
    const options = [
    { value: 1, label: "Receipts and Payments" },
    { value: 2, label: "Receipts Scroll" },
    { value: 3, label: "Payment Scroll" },
    {value: 4, label: "Delayed Savings"},
    {value: 5,label: "Delayed Loan"}
];



      const handleReports = (option) => selectedReportsType(option);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!startDate || !endDate) {
    Swal.fire({
      title: 'Error!',
      text: 'Please select both start and end dates.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  const dataToSend = {
    start_date: startDate,
    end_date: endDate,
  };

  // Determine endpoint based on selected report type
  let endpoint = "show_reports.php";
  if (reportsType && reportsType.label === "Receipts Scroll") {
    endpoint = "receipt_scroll.php";
  } else if (reportsType && reportsType.label === "Payment Scroll") {
    endpoint = "payment_scroll.php";
  }
  else if (reportsType && reportsType.label == "Delayed Savings"){
    endpoint = "delayed_savings.php";
  }
  else if(reportsType && reportsType.label=="Delayed Loan"){
    endpoint ="delayed_loan.php";
  }

  try {
    const response = await fetch(`http://localhost/cvmacts/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    const data = await response.json();
    setReportSummary(data);

    if (response.ok) {
      Swal.fire({
        title: 'Success!',
        text: 'Data fetched successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: data.error || 'Something went wrong.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};



// In your form element:


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
                    <Col md={13}>

                      <div>
                        <Select options={options} value={reportsType} onChange={handleReports}/>
                      </div>
                      
                    </Col>
                    <Col md={5}>
                        <div className="mb-3">
                        <Label htmlFor="receipt-date-input">Start Date</Label>
                        <Input
                          id="receipt-date-input"
                          type="date"
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                        />
                      </div>
                      
                    </Col>
                    <Col>
                        <div className="mb-3">
                        <Label htmlFor="lastpaid-date-input">End Date</Label>
                        <Input
                          id="lastpaid-date-input"
                          type="date"
                          value={endDate}
                          onChange={e => setEndDate(e.target.value)}
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
                {Array.isArray(reportSummary) && reportsType && reportsType.label === "Receipts Scroll" && (
                    <div style={{ overflowX: 'auto', marginTop: 30 }}>
                        <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Receipts Scroll Data
                        </h5>
                        <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>S.No</th>
                            <th>Receipt Date</th>
                            <th>Receipt ID</th>
                            <th>Member No</th>
                            <th>Member Name</th>
                            <th>Towards</th>
                            <th>Amount</th>
                            <th>Interest</th>
                            <th>Late Fee</th>
                            <th>Total Amount</th>
                            <th>Total Savings</th>
                            <th>Loan Pending</th>
                            <th>Loan Acnt No</th>
                            <th>Loan Type Name</th>
                            <th>Last Paid Date</th>
                            <th>ROI</th>
                            <th>Entry Date</th>
                            <th>Modify Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportSummary.map((row, idx) => (
                            <tr key={row.receipts_id || idx}>
                                <td>{idx + 1}</td>
                                <td>{row.receipt_date}</td>
                                <td>{row.receipts_id}</td>
                                <td>{row.m_no}</td>
                                <td>{row.membername}</td>
                                <td>{row.towards}</td>
                                <td>{row.amount}</td>
                                <td>{row.interest}</td>
                                <td>{row.latefee}</td>
                                <td>{row.totalamount}</td>
                                <td>{row.totalsavings}</td>
                                <td>{row.loanpending}</td>
                                <td>{row.loanacntno}</td>
                                <td>{row.loantypename}</td>
                                <td>{row.lastpaiddate}</td>
                                <td>{row.roi}</td>
                                <td>{row.entrydate}</td>
                                <td>{row.modifydate}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                )}


                {reportSummary && !Array.isArray(reportSummary)   && (
                    <div className="mt-4">
                        <Row>
                            <Col md={6}>
                                <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    Summary for Selected Period:
                                </h5>

                                    <table className="table table-bordered" style={{ maxWidth: 400 }}>
                                    <thead>
                                        <tr>
                                        <th>Receipts</th>
                                        <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><strong>Monthly Savings</strong></td>
                                        <td>{reportSummary["monthlysavings"]}</td>
                                        </tr>
                                        <tr>
                                        <td><strong>Loan Repayment</strong></td>
                                        <td>{reportSummary["loan repayment"]}</td>
                                        </tr>
                                        <tr>
                                        <td><strong>Admission Fee</strong></td>
                                        <td>{reportSummary["admission fee"]}</td>
                                        </tr>
                                        <tr>
                                        <td><strong>Total Interest</strong></td>
                                        <td>{reportSummary.total_interest}</td>
                                        </tr>
                                        <tr>
                                        <td><strong>Total Late Fee</strong></td>
                                        <td>{reportSummary.total_latefee}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                            </Col>
                            <Col md={6}>
                               
                                    <br/>
                                    <br/>
                                    <table className="table table-bordered" style={{ maxWidth: 400 }}>
                                    <thead>
                                        <tr>
                                        <th>Receipts</th>
                                        <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td><strong>Loan</strong></td>
                                        <td>{reportSummary["loan"]}</td>
                                        </tr>
                                        <tr>
                                        <td><strong>Salary</strong></td>
                                        <td>{reportSummary["salary"]}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                            </Col>
                            
                        </Row>
                    </div>
                )}

                {Array.isArray(reportSummary) && reportsType && reportsType.label === "Delayed Savings" && (
                    <div style={{ overflowX: 'auto', marginTop: 30 }}>
                        <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Payment Scroll Data
                        </h5>
                        <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>S.No</th>
                            <th>M No.</th>
                            <th>M Name</th>
                            <th>Towards</th>
                            <th>Mobile No.</th>
                            <th>Last Paid Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportSummary.map((row, idx) => (
                            <tr key={row.payments_id || idx}>
                                <td>{idx + 1}</td>
                                <td>{row.m_no}</td>
                                <td>{row.membername}</td>
                                <td>{row.towards}</td>
                                <td>{row.mobile1}</td>
                                <td>{row.lastpaiddate}</td>

                               
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                )}

                {Array.isArray(reportSummary) && reportsType && reportsType.label === "Delayed Loan" && (
                    <div style={{ overflowX: 'auto', marginTop: 30 }}>
                        <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Payment Scroll Data
                        </h5>
                        <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>S.No</th>
                            <th>M No.</th>
                            <th>M Name</th>
                            <th>Towards</th>
                            <th>Mobile No.</th>
                            <th>Last Paid Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportSummary.map((row, idx) => (
                            <tr key={row.payments_id || idx}>
                                <td>{idx + 1}</td>
                                <td>{row.m_no}</td>
                                <td>{row.membername}</td>
                                <td>{row.towards}</td>
                                <td>{row.mobile1}</td>
                                <td>{row.lastpaiddate}</td>

                               
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                )}

                {Array.isArray(reportSummary) && reportsType && reportsType.label === "Payment Scroll" && (
                    <div style={{ overflowX: 'auto', marginTop: 30 }}>
                        <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Payment Scroll Data
                        </h5>
                        <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>S.No</th>
                            <th>Date</th>
                            <th>Payment ID</th>
                            <th>Member No</th>
                            <th>Member Name</th>
                            <th>Towards</th>
                            <th>Amount</th>
                            <th>Mode of Payment</th>
                            <th>Loan Acnt No</th>
                            <th>Loan Type Name</th>
                            <th>Cheque No</th>
                            <th>Bank Name</th>
                            <th>Account No</th>
                            <th>Entry Date</th>
                            <th>Modify Date</th>
                            <th>Modify By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportSummary.map((row, idx) => (
                            <tr key={row.payments_id || idx}>
                                <td>{idx + 1}</td>
                                <td>{row.date}</td>
                                <td>{row.payments_id}</td>
                                <td>{row.mno}</td>
                                <td>{row.membername}</td>
                                <td>{row.towards}</td>
                                <td>{row.amount}</td>
                                <td>{row.modeofpmtname}</td>
                                <td>{row.loanacntno}</td>
                                <td>{row.loantypename}</td>
                                <td>{row.chqno}</td>
                                <td>{row.bankname}</td>
                                <td>{row.acntno}</td>
                                <td>{row.entrydate}</td>
                                <td>{row.modifydate}</td>
                                <td>{row.modifyby}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default Form;

