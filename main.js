// We import our modules from our modules folder
import {Song} from '/modules/song.js';
import {Playlist} from '/modules/playlist.js';

// We create a playlist using our playlist class and name it 'My Playlist'
const myPlaylist = new Playlist('My Playlist');


// We get our general elements from our main.html file using their id
const songsList = document.getElementById('songs-list');
const addSongBtn = document.getElementById('song-button');
const organizePlaylistBtn = document.getElementById('organize-playlist-button');


// This is where we 'name' the form specific elements
const editForm = document.getElementById('edit-form');
const nameInput = document.getElementById('edit-song-name');
const artistInput = document.getElementById('edit-artist');
const genreInput = document.getElementById('edit-genre');
const updateSongBtn = document.getElementById('update-song-button');


// We add our event listeners
organizePlaylistBtn.addEventListener('click', organizePlaylist);
addSongBtn.addEventListener('click', addSong);

// We add the example songs that way I don't have to re-add them every refresh
myPlaylist.addSong(new Song('Enter Sandman', 'Metallica', 'Rock'));
myPlaylist.addSong(new Song('Too Sweet', 'Hozier', 'Indie'));
myPlaylist.addSong(new Song('Wildest Dreams (Taylor\'s version)', 'Taylor Swift', 'Pop'));


function addSong() {
    // We get our song specific values from the main.html file
    const name = document.getElementById('song-name').value; // <- Notice the .value
    const artist = document.getElementById('artist').value;
    const genre = document.getElementById('genre').value;
    // We get our text input values and trim the white space
    // if the name or artist is empty after we do that we throw the alert
    if (!name.trim() || !artist.trim()) {
        window.alert("Song name and artist cannot be empty! Try again!");
        // we don't want to continue, so we just return to exit
        return;
    }
    // We get our songs array using our playlist that we created
    const songs = myPlaylist.getSongs();
    // We search the array to find a song where the song has a name the same as 'name'
    const matchingName = songs.find(song => song.name === name);
    // if matching name is true then we throw the alert that it must be different
    if (matchingName) {
        window.alert("You already added that song! Add a different one.")
        // We don't want to continue, so we just return to exit the function
        return;
    }

    // We create a new song using our song class
    const song = new Song(name, artist, genre);
    // We use our playlist class function of addSong to add the song we just created
    myPlaylist.addSong(song);
    // Reload the song UI so that it includes our new song
    updateSongsUI();
}

function organizePlaylist() {
    //We have an organizeByGenre function in our myPlaylist class, this makes it, so we can easily call it here.
    myPlaylist.organizeByGenre();
    // Reload the song UI so that it includes our organized songs
    updateSongsUI();
}

function updateSongsUI() {
    // We use the getSongs function in our myPlaylist class and assign the array of songs to 'songs'
    const songs = myPlaylist.getSongs();
    // We remove all the songs from the song list
    songsList.innerHTML = '';
    // We add each song in songs with the song as the value and the index as the index
    songs.forEach((song, index) => {
        // We create a new HTML element that is a li (list-item)
        const item = document.createElement('li');
        // We add the song info to the item as the text
        item.textContent = `${song.name} by ${song.artist} (Genre: ${song.genre})`;
        // We create the delete button
        const deleteBtn = document.createElement('button');
        // We indicate what the button is for with the text
        deleteBtn.textContent = 'Delete';
        // We add the class of 'delete-button' so that we can style it appropriately
        deleteBtn.classList.add('delete-button');
        // We add an event listener to the button here so each button has one after it is created
        deleteBtn.addEventListener('click', () => {
            // When we click the button the songs array is 'spliced'
            // It is starting at the index (the location of the song)
            // It is deleting 1 item (the song in question)
            songs.splice(index, 1);
            // Reload the song UI so that it includes our organized songs
            updateSongsUI();
        });
        // We create the edit button element
        const editBtn = document.createElement('button');
        // We indicate what the button is for with the text
        editBtn.textContent = 'Edit';
        // We add the class of 'edit-button' so that it can have a css style applied
        editBtn.classList.add('edit-button');
        // We add an event listener to the button so that each edit button has it
        editBtn.addEventListener('click', () => editSong(index));
        // We then add the edit button and delete button to the "item" (list-item) that we created
        item.appendChild(editBtn);
        item.appendChild(deleteBtn);
        // We then add that  "item" to the songsList portion of the HTML
        songsList.appendChild(item);
    });

}

function editSong(index) {
    // We essentially make a copy of the original song
    const originalSong = myPlaylist.getSong(index);

    // We display the original song's values in the input and select boxes
    nameInput.value = originalSong.name;
    artistInput.value = originalSong.artist;
    genreInput.value = originalSong.genre;

    // We show the form since edit was selected
    editForm.style.display = 'block';

    // We add an event listener to the button
    updateSongBtn.addEventListener('click', function (event) {
        // We need to prevent default because the default action of a form on 'submit'
        // is to refresh the page and send the data
        // We want to update the song details in the playlist and then update the UI
        // without page refresh
        event.preventDefault();

        // We need to make sure the fields aren't empty
        // we are getting the input.value first
        // then we use .trim to trim off the whitespace
        // if the input is empty after we trim the whitespace then we send the alert
        if (!nameInput.value.trim() || !artistInput.value.trim()) {
            window.alert("All fields must be filled out! Try again!");
        } else {
            // We then make a new song using our song class
            const updatedSong = new Song(nameInput.value, artistInput.value, genreInput.value);

            // We remove the song at the original song's index
            // using our removeSong function in our playlist class
            myPlaylist.removeSong(index);

            // We then add the 'updated' song at that same index
            // using our addSongAt function in our playlist class
            myPlaylist.addSongAt(index, updatedSong);
            // We refresh the songs list so that it can display the new value
            updateSongsUI();
        }

        // Then we hide the form since we are finished updating
        editForm.style.display = 'none';
    });
}

// This handles updating the UI to include the example songs
updateSongsUI();