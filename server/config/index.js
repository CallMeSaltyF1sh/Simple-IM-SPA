const mysql_config = {
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'fzx991010',
	database: 'chatroom',
};

const server_port = process.env.PORT || 8080;

const secret = 'nancy';

const cookie_config = {
	domain: 'localhost',
	maxAge: 3600 * 24 * 1000,
	httpOnly: true,
	overwrite: false
};

const saltRounds = 10;

module.exports =  {
    mysql_config,
	server_port,
	secret,
	cookie_config,
	saltRounds
};