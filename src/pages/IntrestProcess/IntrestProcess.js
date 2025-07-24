import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Label, Input, Container } from "reactstrap";
import Swal from 'sweetalert2';

function Form() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ROI, setROI] = useState("");
  const [members, setMembers] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);


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
    roi: ROI, // Your ROI value
    // Optionally include company_id and processing_month if needed by backend
  };

  setLoading(true);
  try {
    const response = await fetch(`http://localhost/cvmacts/interestprocess.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    // Handle 409 Conflict separately
    if (response.status === 409) {
      const data = await response.json();
      Swal.fire({
        title: 'Warning!',
        text: data.message || 'Already added interest for this month.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return; // Stop further processing
    }

    const data = await response.json();

    if (response.ok) {
  Swal.fire({
    title: 'Success!',
    text: 'Data fetched successfully.',
    icon: 'success',
    confirmButtonText: 'OK'
  });
  setTableData(data.data || []);  // <-- This line added to save data
} else {
  setTableData([]);
  Swal.fire({
        title: 'Error!',
        text: data.error || 'Something went wrong.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
  // your existing error handling
  setTableData([]); // Clear table data on error
}
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } finally {
    setLoading(false);
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
                      <div>
                        <Label>ROI Per Annum</Label>
                        <Input type='number' value={ROI} onChange={(e) => setROI(e.target.value)} />
                      </div>
                      <div>
                        <Label>For Members</Label>
                        <Input type='text' value={members} onChange={(e) => setMembers(e.target.value)} />
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
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </Col>
                  </Row>
                </form>
                {tableData.length > 0 && (
                    <div className="mt-5">
                      <h4>Interest Processed Data</h4>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Savings ID</th>
                            <th>Member No (m_no)</th>
                            <th>Interest on Opening</th>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Total Interest</th>
                            <th>Is Processed</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.savings_id}</td>
                              <td>{item.m_no}</td>
                              <td>{item.intonopening}</td>
                              <td>{item.year}</td>
                              <td>{item.month}</td>
                              <td>{item.total_interest}</td>
                              <td>{item.intonsavings_isprocessed}</td>
                              <td>{item.intonsavings_status}</td>
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
