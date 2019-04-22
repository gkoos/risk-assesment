import React from "react";

const CompanyData = ({ data, status }) => {
  if (!status.length) {
    return null;
  }

  if (status === "loading") {
    return (
      <div>
        Retrieving data...
      </div>
    );
  }

  if (data.error.length) {
    return <h3 className="help is-danger">Could not look up company data: {data.error}</h3>;
  }

  return (
    <div>
      {data.isEligible ? (
        <h3 className="help is-success">Your company is eligible for insurance! Your application is registered.</h3>
      ) : (
        <h3 className="help is-danger">Unfortunately your company is not eligible for insurance</h3>
      )}

      <h3>Company data:</h3>
      Company Name: {data.companyName}<br/>
      Company Number: {data.companyNumber}<br/>
      Date of Creation: {data.dateOfCreation}<br/>
      Director(s): {data.directors.join("; ")}
    </div>
  );
};

export default CompanyData;