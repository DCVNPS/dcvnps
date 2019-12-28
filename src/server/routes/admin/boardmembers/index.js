const BoardMemberService = require('../../../dataAccess/boardMemberService');

module.exports = (express, config) => {
    if (!config) {
        throw new Error('admin user missing config object');
    }
    const boardMemberService = BoardMemberService(config);
    const log = config.logger;
    const logLevel = config.logLevel;
    const uuidv4 = config.uuidv4;
    const router = express.Router();

    router.get('/', (req, res) => {
        try {
            const data = boardMemberService.getBoardMembers()
            return res.status(200).send(data);

        }
        catch (err) {
            log.levels('dcvnpslog', config.logLevel.ERROR)
            log.error({ id: req.id, err: err }, `Error getting uuid: ${userid}`);
            return res.status(500).json({ err: err.message });
        }
    });

    return router;
}