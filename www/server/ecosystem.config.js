module.exports = {
    apps: [{
        name: 'express-server',
        script: 'yarn start',
        env: {
            "PORT": 3000,
            "NODE_ENV": "development",
            "MYSQL_HOST": "mariadb",
            "MYSQL_PORT": 3306,
            "MYSQL_DATABASE": "database",
            "MYSQL_USER": "user",
            "MYSQL_PASSWORD": "password",
        }
    }]
};
