const mysql_config = {
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'fzx991010',
	database: 'chatroom',
};

const server_port = process.env.PORT || 8080;
const secret = 'nancy';

module.exports =  {
    mysql_config,
	server_port,
	secret
};