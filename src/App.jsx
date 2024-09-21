import React from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar, Navbar } from "./components";
import { Home, Profile } from "./pages";
import ScreeningSchedule from "./pages/ScreeningSchedule";
import SingleRecordDetails from "./pages/SingleRecordDetails";
import PendingAssignments from "./pages/PendingAssignments";
// import UpcomingDeadlines from "./pages/UpcomingDeadlines";
// import Courses from "./pages/Courses";
// import Grades from "./pages/Grades";
// import CompletedAssignments from "./pages/CompletedAssignments";
// import RecentFeedback from "./pages/RecentFeedback";
// import StudyTime from "./pages/StudyTime";

const App = () => {
  return (
    <div className="sm:-8 relative flex min-h-screen flex-row bg-[#13131a] p-4">
      <div className="relative mr-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assignments/pending" element={<PendingAssignments />} />
          {/* <Route path="/assignments/deadlines" element={<UpcomingDeadlines />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/assignments/completed" element={<CompletedAssignments />} />
          <Route path="/feedback" element={<RecentFeedback />} />
          <Route path="/study-time" element={<StudyTime />} />
          <Route path="/medical-records/:id" element={<SingleRecordDetails />} />
          <Route path="/screening-schedules" element={<ScreeningSchedule />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
