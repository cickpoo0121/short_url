# Short_url
This project created with client side ( [vue.js V2](https://vuejs.org/ )) server side ( [Node.js Express](https://expressjs.com/) ) and Database ( [MySQL](https://www.mysql.com/) ).

## Set up project
This project has folders two servers for client and backend.

1. Clone the project with command :

    ```bash
    git clone https://github.com/cickpoo0121/short_url.git
    ```

2. Open /server/db folder then import the database in this project I will user [Xampp](https://www.apachefriends.org/download.html)
    - How to import database to MySQL with xampp [click](https://www.youtube.com/watch?v=2ynKAAt1G4Y)

3. Create .env file in root folder of server

    ```bash
    DB_HOST = 'your db host'
    DB_USER = 'your db username'
    DB_PASS = 'your db password'
    DB_DATABASE = 'your db name'
    DB_PORT = 'your db port'
    JWT_KEY='your jwt secret key'
    ```

## Getting Started

1. Open terminal and ctrl+shift+5 split ternimal to two.

2. In first ternimal cd to /server and npm i for install packages then npx nodemon to start backend server.

    ```bash
    cd server
    npm i
    npx nodemon
    ```

3. In second ternimal cd to /client and also npm i for install packages then npm run serve to start client server.

    ```bash
    cd client
    npm i
    npm run serve
    ```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

For test admin Dashboard:

```bash
username: admin
password: 1234
```
