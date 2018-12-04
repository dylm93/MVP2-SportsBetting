const router = require ('express').Router();
const controller = require ('./controller');

router.route('/bets')
    .get(controller.get)
    .post(controller.post)
router.route('/api')
    .get(controller.getOdds)
router.route('/signup')
    .post(controller.loginPost)
    .get(controller.getBalance)
router.route('/placedbet')
    .put(controller.placeBet)

module.exports = router;