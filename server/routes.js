const router = require ('express').Router();
const controller = require ('./controller');

router.route('/bets')
    .get(controller.get)
    .post(controller.post)
router.route('/api')
    .get(controller.getOdds)


module.exports = router;