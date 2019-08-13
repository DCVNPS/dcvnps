const database = require('./database');
const jwt = require('jsonwebtoken');
const user = { "userName": "siteuser", "password": "Testing1", "roleCode": "SITUSR", "updateUser": "testUpdate" };

async function testDatabase(user) {
    try {
        // database.deleteUser(user.userName);
        // const instResult = await database.createUser(user);
        // console.log(instResult);
        // if(instResult.success){
        //     const result = await database.authenticate({"userName":user.userName,"password":user.password});
        //     console.log(result);
        //     let dbUser = await database.getUserById(result.authuser.userId);
        //     console.log(JSON.stringify(dbUser));
        //     dbUser = await database.getUserByName(result.authuser.userName);
        //     console.log(JSON.stringify(dbUser));
        // }
        // let selResult = await database.getGalleries();
        // console.log('getsGalleries',selResult);
        // database.getGalleries()
        // .then((result)=>{
        //     const jsonGallery = JSON.parse(result);
        //     jsonGallery.forEach((item)=>{ console.log(item);});
        // });
        // return database.getPhotoByGalleryId("f10448dd-6dfe-11e9-8849-848f69b86260")
        // .then((data)=>{
        //     const photos = [];
        //     let result = [];
        //     data.forEach((item)=>{
        //         console.log(item);
        //         const sr = result.find((y)=> y.year === item.year);
        //         if(!sr){
        //             let jsonEl = {"year":item.year,"authorData":[]};
        //             item.authorData.forEach( authData => {
        //                 jsonEl.authorData.push(authData);
        //             })
        //             result.push(jsonEl);
        //         } else {
        //             item.authorData.forEach( authData => {
        //                 sr.authorData.push(authData);

        //             });
        //         }
        //     });
        //     result.forEach((y)=>{
        //         console.log(y.year);
        //         // console.log(y.authorData);
        //         y.authorData.forEach(authData => {
        //             console.log(authData)
        //             authData.photos.forEach( photo => {
        //                 console.log(photo);
        //             })
        //         });
        //     });
        //     // console.log(JSON.stringify(result));
        //     return;
        // });
        // database.getPhotoByGalleryName('home')
        //     .then((data) => {
        //         const jData = JSON.parse(data);
        //         jData.forEach((y) => {
        //             console.log(`"year": ${y.year}:`);
        //             y.photos.forEach((photo) => {
        //                 console.log(`\tphoto: ${photo.src}`);
        //             });
        //         });
        //     });
        // database.uuid()
        // .then( data => {
        //     console.log(data);
        // })
        // .catch (err => console(err));
        const announceId = null;
        // console.log(database.getAnnouncements(announceId));
        database.getAnnouncements(announceId)
            .then((data) => {
                const jData = JSON.parse(data);
                jData.forEach((r) => {
                    console.log(r);
                });
                console.log(jData);
            })
            .catch(err => { console.error(err) })
            .finally(() => {
                database.destroy();
            });

    }
    catch (err) {
        console.error(err);
        database.destroy();
    }

}

function genAuthToken({ user, pwd }) {
    const username = user || 'siteuser';
    const password = pwd || 'ANz75xWo3n2J3Y';
    const payload = {
        username: username,
        password: password

    }
    database.authenticate(payload)
        .then(result => {
            console.log(result);
            if (result.success) {
                const roleCode = result.authuser.roleCode;
                const admRole = roleCode.match(/ADM$/g);
                const payload = {
                    userid: result.authuser.userId,
                    username: result.authuser.userName,
                    userrole: result.authuser.roleCode,
                    admin: `${(!admRole) ? false : admRole[0] === "ADM"}`
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET);
                console.log(token);
            }
        })
        .catch(err => { console.error(err); });
}

// testDatabase(user);
genAuthToken({});