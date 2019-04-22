// functions to retrieve Companues House data
// TODO contains logic to decide if we can give insurance or not, this should be refactored into its own file!

const fetch = require("node-fetch");

const ApiUrl = "https://api.companieshouse.gov.uk";
const headers = {
  Authorization:
    "Basic " + new Buffer.from(process.env.APP_KEY + ":").toString("base64")
};

fetchApiData = async url => {
  try {
    const response = await fetch(url, { headers });
    const responseBody = await response.json();

    if (response.status != 200) {
      const error = responseBody.error || "Company not found";
      return { status: response.status, error };
    } else {
      return { status: 200, response: responseBody };
    }
  } catch (e) {
    return { status: 500, error: e.message };
  }
};

// return name of officers with director role
getDirectors = officers => {
  return officers.response.items
    .filter(item => item.officer_role === "director")
    .map(item => item.name);
};

module.exports = {
  validateParams: async (ctx, next) => {
    if (
      !ctx.query.personName ||
      !ctx.query.companyNumber ||
      isNaN(ctx.query.companyNumber)
    ) {
      ctx.status = 400;
      ctx.body = { error: "Bad Request" };
    } else {
      await next();
    }
  },

  fetchCompanyData: async companyNumber => {
    const url = `${ApiUrl}/company/${companyNumber}`;
    return await fetchApiData(url);
  },

  fetchOfficersData: async companyNumber => {
    const url = `${ApiUrl}/company/${companyNumber}/officers`;
    return await fetchApiData(url);
  },

  // merge and clean the data from the two API calls
  mergeData: ({ company, officers }) => {
    // if any of the two calls failed, we have an error
    if (company.error) {
      return { status: company.status, error: company.error };
    }

    if (officers.error) {
      return { status: officers.status, error: officers.error };
    }

    let response = {
      status: 200,
      error: "",
      companyName: company.response.company_name,
      companyNumber: company.response.company_number,
      dateOfCreation: company.response.date_of_creation,
      directors: getDirectors(officers)
    };

    return response;
  },

  isDirector: (name, directors) => {
    return directors.some(item=>name.toLowerCase()===item.toLowerCase());
  },

  // check if we can give them insurance
  isEligible: data => {
    // for now if no insolvency history and/or charges, they are good to go
    return (!data.has_insolvency_history && !data.has_charges);
  }
};
