const express = require('express');

const router = express.Router();
const {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
} = require('../controllers/tourController');
//Aqui tenemos como una subapplicación con sus propios middlewares
//En param tenemos acceso al valor, por eso el val
router.param('id', checkId);

//creamos un enrutador, esto es un middleware

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
