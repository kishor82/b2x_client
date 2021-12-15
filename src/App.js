import React, { useState } from "react";
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CButton,
} from "@coreui/react";
import Axios from "axios";
import "./index.css";
import "@coreui/coreui/dist/css/coreui.min.css";

function App() {
  const [jobNumbers, setJobNumbers] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    setJobNumbers(e.target.value);
  };

  const getJobs = async () => {
    const data = jobNumbers
      .split(",")
      .map((item) => item.trim())
      .filter((item) => !!item);
    return Axios.post("/api/jobs/get", data);
  };

  const handeSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await getJobs();
      setResults(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="center">
        <div className="container">
          <div className="item input_area">
            <label for="text_area">
              Enter a Job Number/List of JobNumbers(Comma separated value)
            </label>
            <textarea
              id="text_area"
              name="body"
              rows="15"
              onChange={handleOnChange}
              value={jobNumbers}
            ></textarea>
            <CButton color="primary" onClick={handeSubmit} disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </CButton>
          </div>
          <div className="item result__container">
            <CAccordion alwaysOpen activeItemKey={0}>
              {results.map((result, i) => (
                <CAccordionItem itemKey={i}>
                  <CAccordionHeader>{result.jobNumber} </CAccordionHeader>
                  <CAccordionBody>
                    <code>{JSON.stringify(result.data)}</code>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
