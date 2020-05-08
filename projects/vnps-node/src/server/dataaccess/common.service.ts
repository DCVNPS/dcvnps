import { Config } from '../config';

// common.service.ts
// Common service provides functions for general operations

export class CommonDataService {
    private config: Config = new Config();
    private bcrypt: any;
    private mySQL: any;
    constructor() {
        this.bcrypt = this.config.bcrypt;
        this.mySQL = this.config.mySQL;
    }
    public getVnpsClassMenu() {
        return this.mySQL('vnpsclasses')
            .select({ id: 'classId', level: 'classLevel', description: 'classLevelDesc' })
            .orderBy('classOrder')
            .then(result => {
                return result;
            })
            .catch(err => {
                throw err;
            });
    }

    public readGalleries(galleryId, activeInd) {
        return this.mySQL('galleries')
            .select('galleryId', 'gallery', 'activeInd', 'profilePhoto', 'updatedUserId', 'createdDate', 'updatedDate')
            .whereRaw('`galleryId` = IFNULL(?,`galleryId`) and `activeInd` = IFNULL(?,`activeInd`)', [galleryId, activeInd])
            .orderBy('createdDate')
            .then((data) => {
                return data;
            })
            .catch(function (err) {
                throw err;
            });
    }

    public async  uuid() {
        try {
            const data = await this.mySQL.raw('select uuid() as uuid');
            const jsonString = JSON.stringify(data);
            const jsonValue = JSON.parse(jsonString);
            return jsonValue[0][0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    public getRoles() {
        return this.mySQL('roles')
            .select({ roleCode: 'roleCode', roleDescription: 'roleDescription' })
            .then(data => { return data; })
            .catch(err => {
                throw err;
            });
    }
    public getStates() {
        return this.mySQL('states')
            .select('stateCode', 'description')
            .orderBy('description')
            .then((data) => {
                // console.log(data);
                return data;
            })
            .catch(err => {
                throw err;
            });
    }
    public getAdminLevel(level: string) {
        return this.mySQL('vnpslookup')
            .whereRaw('`lookuptype` = ? and `lookupValue` = IFNULL(?, `lookupValue`)', ['AdminLevel', level])
            .select({ role: 'lookupCode', level: 'lookupValue' })
            .then(data => {
                return data;
            })
            .catch(err => {
                throw err;
            });
    }
}
