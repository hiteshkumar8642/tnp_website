import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { fetchSharedHRList } from "../../api/listOfSharedHR";

const Test = () => {
useEffect(() => {
    async function getTestData() {
    try 
    {        
          const data = await fetchSharedHRList();
          console.log(data);
    } 
    catch (err) 
    {
        console.log(err);
    }
    }
    getTestData();
  }, []);

  return (
    <>
        <h1>
            For Api Testing Only
        </h1>
    </>
  )
};

export default Test;