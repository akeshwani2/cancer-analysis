import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconAlertCircle,
  IconCircleCheck,
  IconBook,
  IconHourglassHigh,
  IconChartBar,
  IconMessageCircle,
  IconClock,
} from "@tabler/icons-react";
import { usePrivy } from "@privy-io/react-auth";
import MetricsCard from "./MetricsCard"; // Adjust the import path
import { useStateContext } from "../context"; // Ensure correct import path

const DisplayInfo = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const { fetchUserAssignments, assignments, fetchUserByEmail } = useStateContext();
  const [metrics, setMetrics] = useState({
    totalCourses: 0,
    totalAssignments: 0,
    completedAssignments: 0,
    pendingAssignments: 0,
    upcomingDeadlines: 0,
    overallGrade: 0,
    recentFeedback: 0,
    studyTimeLogged: 0,
  });

  useEffect(() => {
    if (user && user.email) {
      fetchUserByEmail(user.email.address)
        .then(() => {
          console.log(assignments);
          // Calculate metrics based on assignments data
          // This is a placeholder and should be adjusted based on your actual data structure
          setMetrics({
            totalCourses: new Set(assignments.map(a => a.course)).size,
            totalAssignments: assignments.length,
            completedAssignments: assignments.filter(a => a.status === 'completed').length,
            pendingAssignments: assignments.filter(a => a.status === 'pending').length,
            upcomingDeadlines: assignments.filter(a => new Date(a.deadline) > new Date()).length,
            overallGrade: calculateOverallGrade(assignments),
            recentFeedback: assignments.filter(a => a.hasFeedback).length,
            studyTimeLogged: calculateTotalStudyTime(assignments),
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, fetchUserAssignments, assignments]);

  const metricsData = [
    {
      title: "Assignments Pending",
      subtitle: "View",
      value: metrics.pendingAssignments,
      icon: IconHourglassHigh,
      onClick: () => navigate("/assignments/pending"),
    },
    {
      title: "Upcoming Deadlines",
      subtitle: "View",
      value: metrics.upcomingDeadlines,
      icon: IconAlertCircle,
      onClick: () => navigate("/assignments/deadlines"),
    },
    {
      title: "Courses",
      subtitle: "View",
      value: metrics.totalCourses,
      icon: IconBook,
      onClick: () => navigate("/courses"),
    },
    {
      title: "Overall Grade",
      subtitle: "View",
      value: `${metrics.overallGrade}%`,
      icon: IconChartBar,
      onClick: () => navigate("/grades"),
    },
    {
      title: "Completed Assignments",
      subtitle: "View",
      value: metrics.completedAssignments,
      icon: IconCircleCheck,
      onClick: () => navigate("/assignments/completed"),
    },
    {
      title: "Recent Feedback",
      subtitle: "View",
      value: metrics.recentFeedback,
      icon: IconMessageCircle,
      onClick: () => navigate("/feedback"),
    },
    {
      title: "Study Time Logged",
      subtitle: "View",
      value: `${metrics.studyTimeLogged}h`,
      icon: IconClock,
      onClick: () => navigate("/study-time"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-[26px]">
      <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
        {metricsData.slice(0, 2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="mt-[9px] grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {metricsData.slice(2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default DisplayInfo;