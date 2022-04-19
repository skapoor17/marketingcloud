import { Router } from 'express';

import * as index from '../modules/indexModule';

/**
 * Contains all API routes for the application.
 */
const router = Router();

router.use('/config.json', index.config);
router.use('/save', index.save);
router.use('/publish', index.publish);
router.use('/execute', index.execute);
router.use('/validate', index.validate);
router.use('/', index.ui);


export default router;