import React, { Component } from "react";
import SearchForm from "./SearchForm";
import CompanyData from "./CompanyData";
import Api from "../api";

class Verdict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: { personName: "", companyNumber: "", tAndC: "" },
      formErrors: { personName: "", companyNumber: "", tAndC: "" },
      companyData: {
        error: "",
        companyName: "",
        companyNumber: "",
        dateOfCreation: "",
        directors: [],
        isEligible: false
      },
      fetchDataStatus: ""
    };
  }

  setError(field, errorMessage) {
    let formErrors = this.state.formErrors;
    formErrors[field] = errorMessage;
    this.setState({ formErrors });
  }

  validateFields(fields) {
    let valid = true;
    if (!fields.personName.length) {
      valid = false;
      this.setError("personName", "Name is required");
    } else {
      this.setError("personName", "");
    }

    if (!fields.companyNumber.length) {
      valid = false;
      this.setError("companyNumber", "Company Number is required");
    } else {
      if (isNaN(fields.companyNumber)) {
        valid = false;
        this.setError("companyNumber", "Company Number must be a valid number");
      } else {
        this.setError("companyNumber", "");
      }
    }

    if (!fields.tAndC) {
      valid = false;
      this.setError("tAndC", "T&C must be accepted");
    } else {
      this.setError("tAndC", "");
    }

    return valid;
  }

  submitForm = async e => {
    e.preventDefault();

    const formValues = {
      personName: e.target.personName.value,
      companyNumber: e.target.companyNumber.value,
      tAndC: !!e.target.tAndC.checked
    };

    if (this.validateFields(formValues)) {
      this.setState({fetchDataStatus: "loading"});

      const api = new Api();

      const response = await api.getVerdict(
        formValues.personName,
        formValues.companyNumber
      );
      this.setState({fetchDataStatus: "loaded"});

      this.setState({companyData: response});
    }
    else {
      this.setState({fetchDataStatus: ""});
    }
  };

  render() {
    return (
      <div>
        <h2>Check if your company is eligible for insurance</h2>

        <SearchForm
          data={this.state.formValues}
          errors={this.state.formErrors}
          submitForm={this.submitForm}
        />

        <CompanyData data={this.state.companyData} status={this.state.fetchDataStatus}/>
      </div>
    );
  }
}

export default Verdict;
