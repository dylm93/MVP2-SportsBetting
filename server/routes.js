const router = require ('express').Router();
const controller = require ('./controller');

router.route('/bets')
    .get(controller.get)
    .post(controller.post)
    .delete(controller.delete)
router.route('/api')
    .get(controller.getOdds)
router.route('/signup')
    .post(controller.signUp)
router.route('/login')
    .get(controller.getUserId)
    .post(controller.login)
router.route('/placedbet')
    .get(controller.getBalance)
    .put(controller.placeBet)
router.route('/winners')
    .get(controller.getWinners)
    .post(controller.postWinners)
router.route('/comparewinners')
    .get(controller.compareWinners)

module.exports = router;