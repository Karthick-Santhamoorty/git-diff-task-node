# Info about project

1. This git-diff-task-node will return code difference, author and commiter details of public repo by using commit SHA.
2. provide correct owner of the repo, repo name, commit SHA to see the output.
3. URL looks like- /repositories/:owner/:repository/commit/commitSHA
4. This is the test link you can go there and see output.
http://localhost:8000/repositories/karthick-rs-webdev/color-shader/commit/0cfee5ce48f73c87b7266588ee4b151ab14f840c 

# Available Scripts

In the project directory, you can run:
### `npm install`
and then run
### `npm start`
By default project started at 8000(declared in env) port this 8000 port is used to connect FrontEnd React App. if you change the default port kindly change FE Endpoint.

# Connect react to node
run react project(https://github.com/Karthick-Santhamoorty/git-diff-task.git) simultaneously in 3000 port so that node can get connected with FE.

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

currently codebase is pointed to `master` branch