# Developers setup

To start working in iGenText as a developer:

* clone this repo (creates the GENText-FrontEnd directory)
* install node (node v18.17.1)
* install npm (version 10.1.0)
* within GENText-FrontEnd directory
  * To connect frontEnd with your backend server go to "src/app/modules/auth/core/_requests.ts" and change the URL here:
    ``` export const URL = 'http://localhost:8000'
    ```
  * install iGenText technical dependencies: npm install
  * start iGenText frontend (in development mode): npm start
