import * as path from 'path';
const envPath = path.normalize(__dirname + '../../../.env');
require('dotenv').config({path: envPath});
import app from '../app';

const port = process.env.PORT || 0;

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
