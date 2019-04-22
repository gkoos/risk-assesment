export default class Api {
  async getVerdict(personName, companyNumber) {
    const response = await fetch(`api/verdict?personName=${personName}&companyNumber=${companyNumber}`);
    const json = await response.json();
/*
    const json = {
      error: "",
      isEligible: true,
      companyName: "Company LTD",
      companyNumber: "12345678",
      dateOfCreation: "2018-02-04",
      directors: ["Josh Smith", "Thomas Smith"]
    };*/
    return json;
  }
}