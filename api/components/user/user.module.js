const express                                 = require('express');
const passport                                = require('passport');
const userController                          = require('./user.controller');
const router                                  = express.Router();

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
router.route('/').get(userController.getUsers);

/**
 * @swagger
 * /api/users/{objectId}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a specific user based on objectId
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: objectId
 *        description: The objectId of the user
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
router.route('/:objectId').get(userController.getUser);
router.route('/:objectId').put(userController.updateUser);
router.route('/:objectId').delete(userController.deleteUser);

module.exports = router;
