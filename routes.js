const Router = require("koa-router");
const router = new Router();
const Api = require("./companiesHouseApi");

router.get("/api/verdict", Api.validateParams, async ctx => {
  // fetch data from the two calls asynchronously
  const rawData = {
    company: await Api.fetchCompanyData(ctx.query.companyNumber),
    officers: await Api.fetchOfficersData(ctx.query.companyNumber)
  };

  // construct the response json and status code
  let data = Api.mergeData(rawData);

  // check if personName is a director of the company
  if (!Api.isDirector(ctx.query.personName, data.directors)) {
    data = { status: 403, error: "You are not director of the company" };
  }

  ctx.status = data.status;
  delete data.status;

  if (!data.error) {
    data.isEligible = Api.isEligible(rawData.company.response);
  }

  if (data.isEligible) {
    // if the company can have insurance, we're supposed to send an email about the application
  }

  ctx.body = data;
});

module.exports = router;
