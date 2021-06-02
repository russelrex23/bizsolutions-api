const username = 'root';
const password = '123409876';
const host = '176.9.113.48';
const port = '5051';
const db = 'admin';

module.exports = {
    url: `mongodb://${username}:${password}@${host}:${port}/${db}`
    // url: "''mongodb://' + username + ':' + password + '@' + host + ':' + port + '/' + db
};
