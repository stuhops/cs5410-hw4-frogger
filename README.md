# To Run
This program uses docker.
Follow the instructions to install docker <a href="https://docs.docker.com/get-docker/">here</a>.
Once docker is installed and running, run the following commands:

```
$ docker build -t frogger /path/to/main/directory
$ docker run -p 3000:3000 frogger
```

The server will start and will be available at `localhost:3000`.
