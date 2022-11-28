import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';

const Dashboard = () => {
  useTitle("Dashboard")
  const {user}  = useContext(AuthContext)
  return (
    <div>
      <h2 className="text-3xl">Coming soon</h2>
    </div>
  );
};

export default Dashboard;