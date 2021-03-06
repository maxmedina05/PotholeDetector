/**
* @swagger
* definition:
*   GeneralResponse:
*     required:
*      - success
*      - message
*      - data
*     properties:
*       success:
*         type: string
*       message:
*         type: string
*       data:
*         type: object

*   ErrorResponse:
*     required:
*      - success
*      - message
*     properties:
*       success:
*         type: string
*       message:
*         type: string
*/

function generalResponse(model, success, verb, data) {
  let response = {
    success: success,
    message: (verb === '') ? '' : `${model} was ${verb} successfully!`,
    data: data
  };
  return response;
}

function alreadyDeletedResponse(success, data) {
  let response = {
    success: success,
    message: 'User was already deleted!',
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
  errorResponse: errorResponse,
  alreadyDeletedResponse: alreadyDeletedResponse
};
