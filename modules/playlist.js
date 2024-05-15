export class Playlist {
    constructor(name) {
        this.name = name;
        this.songs = [];
    }

    addSong(song) {
        this.songs.push(song);
    }

    getSongs() {
        return this.songs;
    }
}