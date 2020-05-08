import * as fs from 'fs';
import * as express from 'express';
import { Config } from '../../../config';

class BoardMembersRouter {
    public boardMembersRouter = express.Router();
    private config: Config = new Config();
    constructor() {
        this.configBoardMembersRouter();
    }
    configBoardMembersRouter() {
        this.boardMembersRouter.get('/', (req, res) => {
            try {
                return  res.status(200).json(JSON.parse(fs.readFileSync(`${this.config.rootdir}data/director-board.json`, {encoding: 'utf8'})));
            } catch (err) {
                this.config.logger.levels('dcvnpslog', this.config.logLevel.ERROR);
                this.config.logger.error({ id: req.id, err: err }, 'Error getting board memebers');
                throw err;
            }
        });
    }
}
export default new BoardMembersRouter().boardMembersRouter;
