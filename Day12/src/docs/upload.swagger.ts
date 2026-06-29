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
 */