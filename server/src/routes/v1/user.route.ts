// src/routes/user.routes.ts
import { Router } from 'express';
import { userController } from '../../modules/user.module';
import validateRequest from '../../middlewares/validateRequest';
import {
  addUserSchema,
  updateUserSchema,
} from '../../validations/user.validation';

const router = Router();

/**
 * @openapi
 * /v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', (req, res) => userController.getAllUsers(req, res));

/**
 * @openapi
 * /v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/:id', (req, res) => userController.getUserById(req, res));

/**
 * @openapi
 * /v1/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *               password: secret123
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post(
  '/',
  validateRequest(addUserSchema),
  (req, res) => userController.createUser(req, res)
);

/**
 * @openapi
 * /v1/users/{id}:
 *   put:
 *     summary: Update a user completely
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put(
  '/:id',
  validateRequest(updateUserSchema),
  userController.updateUser
);

/**
 * @openapi
 * /v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/:id', userController.deleteUser);

export default router;
