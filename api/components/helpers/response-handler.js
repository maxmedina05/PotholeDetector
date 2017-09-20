function generalResponse(success, verb, data) {
  let response = {
    success: success,
    message: (verb === '') ? '' : `User was ${verb} successfully!`,
    data: data
  };
  return response;
}

function errorResponse(err) {
  let response = {
    success: false,
    message: err.message || err
  };
  return response;
}

module.exports = {
  generalResponse: generalResponse,
  errorResponse: errorResponse
};
