import { useNavigate } from 'react-router-dom';
import React from 'react';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDownloadReport = async () => {
    try {
      // Send GET request to the backend to fetch the report (CSV file)
      const response = await fetch('http://localhost:5000/report', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send the token for auth
        },
      });

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error('Failed to generate the report');
      }

      // Convert the response into a blob (binary data)
      const blob = await response.blob();

      // Create a temporary link element to trigger the file download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'user_report.csv'; // Name of the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
      URL.revokeObjectURL(url); // Free up the object URL
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='home-button'>
      <h1>Welcome to 11million Crafts!</h1>
      
      {/* Download Report Button */}
      <button onClick={handleDownloadReport}>Download Report</button>
      
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
