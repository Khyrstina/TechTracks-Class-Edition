// Any imports will go here
import { Song } from './modules/song.js';
import { Playlist } from './modules/playlist.js';

const myPlaylist = new Playlist('My Playlist');
// We get our general elements from our main.html file using their id


const organizePlaylistBtn = document.getElementById('organize-playlist-button');


// We get our form elements for editing
const editForm = document.getElementById('edit-form');

const updateSongBtn = document.getElementById('update-song-button');


// We add example songs that way I don't have to re-add them every refresh
myPlaylist.addSong(new Song('Enter Sandman', 'Metallica', 'Rock'));
myPlaylist.addSong(new Song('Too Sweet', 'Hozier', 'Indie'));
myPlaylist.addSong(new Song('Wildest Dreams (Taylor\'s version)', 'Taylor Swift', 'Pop'));



const nameInput = document.getElementById('song-name');
const artistInput = document.getElementById('artist');
const genreInput = document.getElementById('genre');
const addSongBtn = document.getElementById('song-button');
addSongBtn.addEventListener('click', addSong)



function addSong() {
    const name = nameInput.value;
    const artist = artistInput.value;
    const genre = genreInput.value;
    const song = new Song(name, artist, genre);
    myPlaylist.addSong(song);

updateSongsUI();
}

function organizePlaylist() {
// Option to sort the songs by genre
}

const songsList = document.getElementById('songs-list');
function updateSongsUI() {
    const songs = myPlaylist.getSongs();
    songsList.innerHTML = '';
    songs.forEach((song, index) => {
        const item = document.createElement('li');

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.addEventListener('click', () => {
            songs.splice(index, 1);
            updateSongsUI();
        })

        item.textContent = `${song.name} by ${song.artist} (Genre: ${song.genre})`

        item.appendChild(deleteBtn);
        songsList.appendChild(item);
    });

    }


function editSong(index) {
   // Option to edit the song information
    }

// This handles updating the UI to include the example songs
updateSongsUI();