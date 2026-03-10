import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import ActiveWorkoutPage from "./pages/ActiveWorkoutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "/workout/:workoutId",
    Component: ActiveWorkoutPage,
  },
]);