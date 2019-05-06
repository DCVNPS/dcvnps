const database = require('./database');
const user = { "userName": "siteuser", "password": "Testing1","roleCode":"SITUSR","updateUser":"testUpdate" };

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
        // database.getPhotoByGalleryId("d63a6b38-6dfe-11e9-8849-848f69b86260")
        // .then((data)=>{
        //     let result = [];
        //     data.forEach((item)=>{
        //         const sr = result.find((y)=> y.year === item.year);
        //         if(!sr){
        //             let jsonEl = {"year":item.year,"photos":[]};
        //             jsonEl.photos.push({"src":`galleries/${item.gallery}/${item.year}/${item.photo}`,"author":item.author,"portrait":item.portrait});
        //             result.push(jsonEl);
        //         } else {
        //             sr.photos.push({"src":`galleries/${item.gallery}/${item.year}/${item.photo}`,"author":item.author,"portrait":item.portrait});
        //         }
        //     });
        //     result.forEach((y)=>{
        //         console.log(y.year);
        //         y.photos.forEach((photo)=>{
        //             console.log(photo.src);
        //         })
        //     });
        //     console.log(JSON.stringify(result));
        // });
        database.getPhotoByGalleryName('home')
        .then((data)=>{
            const jData = JSON.parse(data);
            jData.forEach((y)=>{
                console.log(`"year": ${y.year}:`);
                y.photos.forEach((photo)=>{
                    console.log(`\tphoto: ${photo.src}`);
                });
            });
    });
    }
    catch(err){
        console.error(err);
        database.destroy();
    }

}

testDatabase(user);