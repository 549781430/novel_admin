var user = {
    insert: 'INSERT INTO jieqi_system_users(uname,name, pass,regdate,email) VALUES(?,?,?,?,?)',
    update: 'update jieqi_system_users set pass=? where uid=?',
    delete: 'delete from jieqi_system_users where id=?',
    queryByNameAddPass: 'select * from jieqi_system_users where uname=? and pass=?',
    queryAll: 'select * from jieqi_system_users'
};

module.exports = user;