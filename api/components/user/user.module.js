const express                                 = require('express');
const router                                  = express.Router();
const userController                          = require('./user.controller');

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: integer
 *       password:
 *         type: string

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
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list of users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/users').get(userController.getUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: add a new user
 *     parameters:
 *        name: user
 *        description: User properties
 *        in: body
 *        required: true
 *        schema:
 *         $ref: '#/definitions/User'
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/users').post(userController.addUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a specific user based on ObjectId
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        description: The ObjectId of the user
 *        in: path
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/users/:userId').get(userController.getUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a specific user based on ObjectId
 *     produces: application/json
 *     parameters:
 *      - name: userId
 *        description: The ObjectId of the user
 *        in: path
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: The updated user
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/users/:userId').put(userController.updateUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a specific user based on ObjectId
 *     produces: application/json
 *     parameters:
 *      - name: userId
 *        description: The ObjectId of the user
 *        in: path
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: The user that was deleted
 *         schema:
 *           $ref: '#/definitions/GeneralResponse'
 *       default:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
router.route('/users/:userId').delete(userController.deleteUser);

module.exports = router;
