type container = {
    Id: string;
    Image: string;
    ImageID: string;
    state: string;
    Status: string
};

enum SocketTypes {
    created = "created",
    restarting = "restarting",
    running = "running",
    removing = "removing",
    paused = "paused",
    exited = "exited",
    dead = "dead",
};
