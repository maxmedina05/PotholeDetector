const express                           = require('express');
const router                            = express.Router();
const streetDefectController            = require('./street-defect.controller');

/**
 * @swagger
 * definition:
 *   StreetDefect:
 *     properties:
 *       deviceName:
 *         type: string
 *       latitude:
 *         type: number
 *       longitude:
 *         type: number

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

/**
 * @swagger
 * /api/street-defects:
 *   get:
 *     tags:
 *       - StreetDefects
 *     description: Returns a list of streetDefects
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of streetDefects
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/').get(streetDefectController.getStreetDefects);

/**
 * @swagger
 * /api/street-defects:
 *   post:
 *     tags:
 *       - StreetDefects
 *     description: add a new street Defect
 *     parameters:
 *      - name: streetDefect
 *        description: Street Defect properties
 *        in: body
 *        required: true
 *        schema:
 *         $ref: '#/definitions/StreetDefect'
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: the new street defect created
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/').post(streetDefectController.addStreetDefect);

/**
 * @swagger
 * /api/street-defects/{streetDefectId}:
 *   get:
 *     tags:
 *       - StreetDefects
 *     description: Returns a specific street defect based on ObjectId
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: streetDefectId
 *        description: The ObjectId of the street defect
 *        in: path
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: An array of street defects
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/:streetDefectId').get(streetDefectController.getStreetDefect);

/**
 * @swagger
 * /api/street-defects/{streetDefectId}:
 *   put:
 *     tags:
 *       - StreetDefects
 *     description: Updates a specific street defect based on ObjectId
 *     produces: application/json
 *     parameters:
 *      - name: streetDefectId
 *        description: The ObjectId of the street defect
 *        in: path
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: The updated street defect
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/:streetDefectId').put(streetDefectController.updateStreetDefect);

/**
 * @swagger
 * /api/street-defects/{streetDefectId}:
 *   delete:
 *     tags:
 *       - StreetDefects
 *     description: Deletes a specific street defect based on ObjectId
 *     produces: application/json
 *     parameters:
 *      - name: streetDefectId
 *        description: The ObjectId of the street defect
 *        in: path
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: The street defect that was deleted
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/:streetDefectId').delete(streetDefectController.deleteStreetDefect);

module.exports = router;
