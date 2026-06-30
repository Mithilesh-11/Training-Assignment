/**
 * @openapi
 *
 * /upload/profile:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Upload Profile Image
 *     description: Upload a profile image (JPEG, PNG, WEBP).
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 *
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *       413:
 *         description: File Too Large
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileTooLargeError'
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 *
 *
 * /upload/document:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Upload Document
 *     description: Upload a PDF, DOC or DOCX document.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 *
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *       413:
 *         description: File Too Large
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileTooLargeError'
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 *
 * components:
 *   schemas:
 *     UploadResponse:
 *       type: object
 *       required:
 *         - success
 *         - message
 *         - data
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Profile image uploaded successfully.
 *         data:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               format: uri
 *             publicId:
 *               type: string
 *             folder:
 *               type: string
 *             originalName:
 *               type: string
 *             fileName:
 *               type: string
 *             mimeType:
 *               type: string
 *             size:
 *               type: integer
 *             resourceType:
 *               type: string
 *
 *     ValidationError:
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Validation failed for the request payload.
 *         errors:
 *           type: object
 *           description: Field-specific validation error messages
 *
 *     FileTooLargeError:
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Uploaded file exceeds the maximum allowed size.
 *
 *     InternalServerError:
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: An unexpected error occurred.
 */