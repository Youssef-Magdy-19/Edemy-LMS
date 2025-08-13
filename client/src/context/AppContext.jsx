import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

// @ts-ignore
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([])
  const [isEducator, setIsEducator] = useState(false)
  const [userData, setUserData] = useState(null)
  const [enrolledCoursesIds, setEnrolledCoursesIds] = useState([])
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // get token
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (user && isLoaded) {
      fetchUserData()
      fetchUserEnrolledCoursesIds()
    }
  }, [user, isLoaded]);

  // Fetch All Courses
  // @ts-ignore
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/course/all')
      console.log(data)
      if (data.success) {
        setAllCourses(data.courses)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Fetch User Data
  const fetchUserData = async () => {
    if (user?.publicMetadata?.role === 'educator') {
      setIsEducator(true)
    }
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/user/data', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setUserData(data.user)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Fetch User Enrolled Courses Ids
  const fetchUserEnrolledCoursesIds = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/user/enrolled-courses',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setEnrolledCoursesIds(data.enrolledCourses.reverse())
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Fetch User Enrolled Courses
  const fetchUserEnrolledCourses = async () => {
    try {
      if (enrolledCoursesIds.length > 0) {
        const { data } = await axios.post(backendUrl + '/api/course/get-courses-by-ids', { ids: enrolledCoursesIds })

        if (data.success) {
          setEnrolledCourses(data.courses);
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }



  useEffect(() => {
    fetchUserEnrolledCourses()
  }, [enrolledCoursesIds]);

  return (
    <AppContext.Provider value={{ 
      user, 
      fetchAllCourses, 
      allCourses, 
      setAllCourses,
      backendUrl, 
      userData, 
      setUserData, 
      fetchUserData,
      getToken, 
      enrolledCoursesIds, 
      fetchUserEnrolledCourses, 
      enrolledCourses,
      isEducator,
      setIsEducator 
      }}>
      {children}
    </AppContext.Provider>
  );
};
