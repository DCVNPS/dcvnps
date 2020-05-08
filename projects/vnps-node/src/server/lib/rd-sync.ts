import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
// This based on the hint of RonZ on Stackoverflow.com
// https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty/32197381
// Should not write your own function. however, in this case, the Node function fs.removeDirSync
// is just at the experimental stage can be removed anytime.
// This code is used to avoid issue if the fs.removeDirSync is removed in the future.
// if not, we can update to use fs.removeDirSync later.
export class RemoveDirSync {
    private readdir = util.promisify(fs.readdir);
    private lstat = util.promisify(fs.lstat);
    private unlink = util.promisify(fs.unlink);
    private rmdir = util.promisify(fs.rmdir);

    public async rmDirSync(dir: string) {
        try {
            const files = await this.readdir(dir);
            await Promise.all(files.map(async (file) => {
                try {
                    const p = path.join(dir, file);
                    const stat = await this.lstat(p);
                    if (stat.isDirectory()) {
                        await this.rmDirSync(p);
                    } else {
                        await this.unlink(p);
                        console.log(`Removed file ${p}`);
                    }
                } catch (err) {
                    console.error(err);
                }
            }));
            await this.rmdir(dir);
            // console.log(`Removed dir ${dir}`);
        } catch (err) {
          console.error(err);
        }
    }
}
