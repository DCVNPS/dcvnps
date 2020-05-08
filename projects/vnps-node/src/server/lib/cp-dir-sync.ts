import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
// Nodejs FileStem has only copyFile and copyFileSync
// This utility is to help with copyDirSync
export class CopyDirSync {
    private readdir = util.promisify(fs.readdir);
    private lstat = util.promisify(fs.lstat);
    private cpfile = util.promisify(fs.copyFile);
    private COPYFILE_FICLONE_FORCE = fs.constants.COPYFILE_FICLONE_FORCE;
    public async cpDirSync(source: string, target: string) {
        try {
            const childItems = await this.readdir(source);
            await Promise.all(childItems.map(async (childItem) => {
                try {
                    const sourceChildPath = path.join(source, childItem);
                    const targetChildPath = path.join(target, childItem);
                    const stat = await this.lstat(sourceChildPath);
                    if (stat.isDirectory()) {
                        fs.mkdirSync(targetChildPath);
                        await this.cpDirSync(sourceChildPath, targetChildPath);
                    } else {
                        await this.cpfile(sourceChildPath, targetChildPath, this.COPYFILE_FICLONE_FORCE);
                    }
                } catch (err) {
                    console.error(err);
                }
            }));
        } catch (err) {
          console.error(err);
        }
    }

}
