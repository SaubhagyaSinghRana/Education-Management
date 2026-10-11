import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import Teachers from "../pages/admin/Teachers";
import Classes from "../pages/admin/Classes";
import Subjects from "../pages/admin/Subjects";
import Enrollments from "../pages/admin/Enrollments";
import Exam from "../pages/admin/Exam";
import Fees from "../pages/admin/Fees";
import Notice from "../pages/admin/Notice";

import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherStudents from "../pages/teacher/Students";
import TeacherAttendance from "../pages/teacher/Attendance";
import TeacherMarks from "../pages/teacher/Marks";

import StudentDashboard from "../pages/student/Dashboard";
import Profile from "../pages/student/Profile";
import StudentAttendance from "../pages/student/Attendance";
import StudentMarks from "../pages/student/Marks";

function AppRoutes() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Routes>

      {/* Login */}
      <Route
        path="/"
        element={
          token ? (
            role === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : role === "teacher" ? (
              <Navigate to="/teacher/dashboard" replace />
            ) : role === "student" ? (
              <Navigate to="/student/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/login"
        element={
          token ? (
            role === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : role === "teacher" ? (
              <Navigate to="/teacher/dashboard" replace />
            ) : role === "student" ? (
              <Navigate to="/student/dashboard" replace />
            ) : (
              <Login />
            )
          ) : (
            <Login />
          )
        }
      />

      {/* ADMIN */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<DashboardLayout />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/students"
            element={<Students />}
          />

          <Route
            path="/admin/teachers"
            element={<Teachers />}
          />

          <Route
            path="/admin/classes"
            element={<Classes />}
          />

          <Route
            path="/admin/subjects"
            element={<Subjects />}
          />

          <Route
            path="/admin/enrollments"
            element={<Enrollments />}
          />

          <Route
            path="/admin/exam"
            element={<Exam />}
          />

          <Route
            path="/admin/fees"
            element={<Fees />}
          />

          <Route
            path="/admin/notice"
            element={<Notice />}
          />

        </Route>
      </Route>

      {/* TEACHER */}
      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route element={<DashboardLayout />}>

          <Route
            path="/teacher/dashboard"
            element={<TeacherDashboard />}
          />

          <Route
            path="/teacher/students"
            element={<TeacherStudents />}
          />

          <Route
            path="/teacher/attendance"
            element={<TeacherAttendance />}
          />

          <Route
            path="/teacher/marks"
            element={<TeacherMarks />}
          />

        </Route>
      </Route>

      {/* STUDENT */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route element={<DashboardLayout />}>

          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/student/profile"
            element={<Profile />}
          />

          <Route
            path="/student/attendance"
            element={<StudentAttendance />}
          />

          <Route
            path="/student/marks"
            element={<StudentMarks />}
          />

        </Route>
      </Route>

      {/* DEFAULT */}
      <Route
        path="*"
        element={
          token ? (
            role === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : role === "teacher" ? (
              <Navigate to="/teacher/dashboard" replace />
            ) : role === "student" ? (
              <Navigate to="/student/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

    </Routes>
  );
}

export default AppRoutes;