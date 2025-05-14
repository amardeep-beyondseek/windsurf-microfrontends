import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Dashboard = ({ dashboardData: propsDashboardData, loading: propsLoading, error: propsError, isContainer = false }) => {
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Only use props when this component is rendered by the container
  if (!isContainer) {
    console.warn('Dashboard component should be rendered through DashboardContainer');
    return (
      <div className="dashboard-error">
        This component must be rendered through DashboardContainer.
      </div>
    );
  }

  // Use props directly without any data manipulation
  const dashboardData = propsDashboardData || {
    stats: {
      users: 0,
      revenue: 0,
      orders: 0,
      visitors: 0
    },
    recentActivity: [],
    chartData: {
      revenue: [],
      users: [],
      activityByType: []
    }
  };

  // Use props for loading and error states
  const loading = propsLoading;
  const error = propsError;

  // Show loading state
  if (loading) return <div className="dashboard-loading">Loading dashboard data...</div>;
  
  // Show error state
  if (error) return <div className="dashboard-error">{error}</div>;
  
  // Check if we have the required data
  const hasRequiredData = dashboardData && 
                          dashboardData.stats && 
                          dashboardData.chartData && 
                          dashboardData.chartData.revenue && 
                          dashboardData.chartData.users && 
                          dashboardData.chartData.activityByType;
                          
  if (!hasRequiredData) {
    console.error('Missing required data for dashboard display');
    return <div className="dashboard-error">Missing required data for dashboard display</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Users</h3>
          <p className="stat-value">{dashboardData.stats.users.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="stat-value">${dashboardData.stats.revenue.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p className="stat-value">{dashboardData.stats.orders.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Visitors</h3>
          <p className="stat-value">{dashboardData.stats.visitors.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Revenue Chart */}
        <div className="chart-card">
          <h2>Daily Revenue (Last 7 Days)</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dashboardData.chartData.revenue}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => ['$' + value.toLocaleString(), 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#3498db" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="chart-card">
          <h2>User Growth (Last 6 Months)</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dashboardData.chartData.users}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Users']} />
                <Bar dataKey="users" fill="#2ecc71">
                  {dashboardData.chartData.users.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Distribution Chart */}
        <div className="chart-card">
          <h2>Activity Distribution</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dashboardData.chartData.activityByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                >
                  {dashboardData.chartData.activityByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [value, props.payload.type]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {dashboardData.recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'order' && '🛒'}
                {activity.type === 'signup' && '👤'}
                {activity.type === 'review' && '⭐'}
              </div>
              <div className="activity-details">
                <p>
                  <strong>{activity.user}</strong>
                  {activity.type === 'order' && ` placed an order for $${activity.amount}`}
                  {activity.type === 'signup' && ' joined the platform'}
                  {activity.type === 'review' && ` left a ${activity.rating}-star review`}
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
