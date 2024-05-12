// we indicate that we want to export the class
// which allows the other .js files to use it when it is imported
export class Playlist {

    // the constructor tells us what we will need to assign to each and every playlist
    constructor(name) {
        // a playlist isn't a playlist without a name
        this.name = name;
        // a playlist isn't a playlist without an array of songs
        this.songs = [];
    }

    // we can have methods in our class because they give the object we create (a playlist)
    // actions that it can perform. So basically we are saying 'hey the playlist should be able to...'

    addSong(song) {
        // With the song info we add it to the end of the songs array
        this.songs.push(song);
    }

    removeSong(index) {
        // We take the songs array and at the index of the song passed in
        // we delete 1 item
        this.songs.splice(index, 1);
    }

    organizeByGenre() {
        // Using our songs array we take two of the songs (which we call a and b)
        // We then compare the genre property of those songs
        // localeCompare compares the strings and essentially alphabetizes them in ascending order (default)
        this.songs.sort((a, b) => a.genre.localeCompare(b.genre));
    }

    getSongs() {
        return this.songs;
    }

    getSong(index) {
        return this.songs[index];
    }

    addSongAt(index, song) {
        //Splice can also be used to edit (not just delete) an array
        // we are saying to add the song to the array at the index of the original song
        this.songs.splice(index, 0, song);
    }
}