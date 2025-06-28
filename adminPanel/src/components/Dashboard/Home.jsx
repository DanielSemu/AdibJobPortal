import { useEffect, useState } from "react";
// import EcommerceMetrics from "../Report/EcommerceMetrics";
// import MonthlyTarget from "../Report/MonthlyTarget";

// Home.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  getApplications,
  getJobs,
  getActiveJobs,
  getExpiredJobs,
} from "../services/jobsService";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [expiredJobs, setExpiredJobs]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getJobs();
        const appsData = await getApplications();
        const active = await getActiveJobs();
        const expired=await getExpiredJobs()

        setJobs(jobsData);
        setApplications(appsData);
        setActiveJobs(active);
        setExpiredJobs(expired)
      } catch (error) {
        console.error("Error loading dashboard data", error);
      }
    };

    fetchData();
  }, []);

  // 🧮 Calculate KPI values
  const totalVacancies = jobs.length;
  const totalApplicants = applications.length;

  const approved = applications.filter(
    (app) => app.status === "Accepted"
  ).length;
  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;
  const pending = applications.filter((app) => app.status === "Pending").length;
  // const sms_sent = applications.filter(
  //   (app) => app.status === "SMS_Sent"
  // ).length;

  const openVacancies = activeJobs.length;
  const expiredVacancies=expiredJobs.length;

  // 📊 Applicants per job for bar chart
  const applicantsPerJob = activeJobs.map((job) => {
    const count = applications.filter((app) => app.job === job.id).length;
    return { name: job.title, applicants: count };
  });

  // 🥧 Pie chart data
  const statusData = [
    { name: "Approved", value: approved },
    { name: "Rejected", value: rejected },
    { name: "Pending", value: pending },
  ];

  const pieColors = ["#22c55e", "#ef4444", "#facc15"];

  // KPI data
  const stats = [
    {
      label: "Total Vacancies Posted",
      value: totalVacancies,
      icon: "📌",
      color: "text-blue-600",
    },
     {
      label: "Vacancies Open Now",
      value: openVacancies,
      icon: "📅",
      color: "text-purple-600",
    },
     {
    label: "Expired Jobs",
    value: expiredVacancies,
    icon: "⏳",
    color: "text-gray-600",
  },
    {
      label: "Total Applicants",
      value: totalApplicants,
      icon: "👤",
      color: "text-indigo-600",
    },
     {
      label: "Pending Applications",
      value: pending,
      icon: "🕓",
      color: "text-yellow-500",
    },
    {
      label: "Applications Approved",
      value: approved,
      icon: "✅",
      color: "text-green-600",
    },
    {
      label: "Applications Rejected",
      value: rejected,
      icon: "❌",
      color: "text-red-600",
    },
   
   
  ];

  const renderCustomTick = ({ x, y, payload }) => {
    const MAX_LENGTH = 10;
    const label =
      payload.value.length > MAX_LENGTH
        ? payload.value.slice(0, MAX_LENGTH) + "..."
        : payload.value;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          textAnchor="end"
          fill="#333"
          fontSize={14}
          transform="rotate(-30)"
          dy={10}
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
        Vacancy Management Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition"
          >
            <div className={`text-4xl ${item.color}`}>{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Applicants Per Active Vacancy
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={applicantsPerJob}>
              <XAxis
                dataKey="name"
                interval={0}
                height={60}
                tick={renderCustomTick}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applicants" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Application Status Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// <div className="my-12 grid grid-cols-12 gap-4 md:gap-6">
//         <div className="col-span-12 space-y-6 xl:col-span-12">
//           {/* <EcommerceMetrics /> */}
//           <EcommerceMetrics/>
//           {/* <MonthlySalesChart /> */}
//         </div>

//          <div className="col-span-12 ">
//           <MonthlyTarget />
//         </div>

//         <div className="col-span-12">
//           {/* <StatisticsChart /> */}
//         </div>

//         <div className="col-span-12 xl:col-span-5">
//           {/* <DemographicCard /> */}
//         </div>

//         <div className="col-span-12 xl:col-span-7">
//           {/* <RecentOrders /> */}
//         </div>
//       </div>
