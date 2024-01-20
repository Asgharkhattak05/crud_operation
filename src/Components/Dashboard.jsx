import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'

const Dashboard = () => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);

  const setData = (curData) => {
   
    const { fullName, cnic,course, checkbox, id } = curData;
 
    // ______________________storing Data Into Local Storag 

    localStorage.setItem("ID", id);
    localStorage.setItem("Full Name", fullName);
    localStorage.setItem("cnic",cnic);
    localStorage.setItem("course",course);
    localStorage.setItem("Checkbox Value", checkbox);
  };

 
// _____________________________First Time Fetch Data 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://65aa006b081bd82e1d95d7eb.mockapi.io/fakeData`
        );
        setApiData(response.data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  // __________________________Get Updated Data After Deletion 
  const getUpdateData = async () => {
    const resp = await axios.get(
      `https://65aa006b081bd82e1d95d7eb.mockapi.io/fakeData`
    );
    setApiData(resp.data);
  };

  // _________________________Delete Data ___________________

  const deleteData = async (id) => {
    // Alert message
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        // Wait for the deletion to complete
        await axios.delete(`https://65aa006b081bd82e1d95d7eb.mockapi.io/fakeData/${id}`);
        // After successful deletion, fetch and update the data
        getUpdateData();
        
        // Show success message
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };
  

  return (
    <>   
   <div className="mb-3">
      <h1 className=" font-serif py-2 rounded-sm px-16 bg-indigo-600">DashBoard</h1>
    </div>
    <div className="Dashboard">
    <div className="mb-3">
      <button className="border rounded-sm font-serif py-2 px-6 bg-green-600"><NavLink to="/">Add New Data</NavLink></button>
    </div>
      {error && <div className="error">{error}</div>}
      <table className="border-collapse border-4 border-slate-400">
        <thead className="bg-slate-200 text-black">
          <tr>
            <th className="border py-2 px-6 border-slate-300">Full Name</th>
            <th className="border py-2 px-6 border-slate-300">CNIC</th>
            <th className="border py-2 px-6 border-slate-300">Course</th>
            <th className="border py-2 px-6 border-slate-300">
              Checked Status
            </th>
            <th className="border py-2 px-6 border-slate-300">Update Value</th>
            <th className="border py-2 px-6 border-slate-300">Delete Value</th>
          </tr>
        </thead>
        <tbody className="bg-white text-black">
          {apiData.map((curData, index) => {
            return (
              <tr className="text-center " key={index}>
                {/* {console.log(curData)} */}
                <td className="border border-slate-300 px-5 py-1">
                  {curData.fullName}
                </td>
                <td className="border border-slate-300 px-5 py-1">
                  {curData.cnic}
                </td>
                <td className="border border-slate-300 px-5 py-1">
                  {curData.course}
                </td>
                <td className="border border-slate-300  px-5 py-1">
                  {curData.checkbox ? "checked" : "unchecked"}
                </td>

                <td
                  onClick={() => setData(curData)}
                  className="border border-slate-300 font-serif bg-orange-600 px-5 py-1"
                >
                  <NavLink to="/update">Update</NavLink>
                </td>

                <td
                  onClick={() => deleteData(curData.id)}
                  className="border font-serif border-slate-300  px-5 py-1 bg-[#FF0000] cursor-pointer"
                >
                  Delete
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>

  );
};

export default Dashboard;
