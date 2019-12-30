const fs = require('fs');

module.exports = (config) => {

    if (!config) {
        throw new Error('commonService missing config object.')
    }
    const serverRoot = config.rootdir;
    function getBoardMembers() {
        try {
            const boardMembers = JSON.parse(fs.readFileSync(`${serverRoot}/data/director-board.json`));
            return boardMembers;
        }
        catch (err) {
            log.levels('dcvnpslog', logLevel.ERROR)
            log.error({ id: req.id, err: err }, 'Error getting board memebers');
            throw err;
        }
    }
    return {
        getBoardMembers
    }
}
