function AdminReports() {
  const reports = [
    {
      id: 1,
      title: "Total Sales",
      value: "₹12,50,000",
    },
    {
      id: 2,
      title: "Total Orders",
      value: "1,200",
    },
    {
      id: 3,
      title: "Total Users",
      value: "500",
    },
    {
      id: 4,
      title: "Total Sellers",
      value: "30",
    },
  ];

  return (
    <div>
      <h1>Reports</h1>

      <p>View ecommerce statistics and reports.</p>

      <div className="stats-container">
        {reports.map((report) => (
          <div className="stat-card" key={report.id}>
            <h3>{report.title}</h3>
            <p>{report.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReports;