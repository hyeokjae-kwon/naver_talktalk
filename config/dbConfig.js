/* DB Info */
module.exports = {
    host : process.env.NODE_MARIADB_HOST || 'localhost'
    , port : process.env.NODE_MARIADB_PORT || '3306'
    , user : process.env.NODE_MARIADB_USER || 'node_user'
    , password : process.env.NODE_MARIADB_PASSWORD || 'nodeuser1!'
    , database : process.env.NODE_MARIADB_DATABASE || 'nodetest'
};