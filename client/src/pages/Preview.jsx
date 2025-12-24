import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import Loader from "../components/Loader";

const Preview = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    setResumeData(
      dummyResumeData.find((resume) => resume._id === resumeId || null)
    );
  };

  useEffect(() => {
    loadResume();
  }, []);

  return resumeData ? <div className="bg-slate-100">
    <div></div>
  </div> : <Loader />;
};

export default Preview;
