alert("hello world");

fetch('./albums.json')
  .then(response => response.json())
  .then(albumsData => {
    let html = "";

    albumsData.forEach((album) => {
        if (album.limitedEdition === "True") {
            const limitedEditionAlbum = limitedEdition(album);
            html += limitedEditionAlbum;
        } else if (album.limitedEdition === "False") {
            const standardEditionAlbum = standardEdition(album);
            html += standardEditionAlbum;           
        }
        const numCopies = getNumCopies(album);
        html += numCopies;
        

        const songList = getSongs(album);
        html += songList;
        
    });

    const numTotalAlbums = getTotalAlbums(albumsData);
    html += numTotalAlbums;
    console.log(numTotalAlbums)
   
    document.body.innerHTML = html;
  })
  .catch(error => {
    console.error(error);
  });

function limitedEdition(album) {
    const message = `The album "${album.title}" by ${album.artist} is considered a limited edition. Please ensure it's displayed in the "Limited Edition" section.`;
    console.log(message);
    return `<p>${message}</p>`;
}

function standardEdition(album) {
    const message = `The album "${album.title}" by ${album.artist} is not a limited edition. Please display by genre.`;
    console.log(message);
    return `<p>${message}</p>`;
}

function getNumCopies(album) {
    const message = `We currently have ${album.numCopies} of the album "${album.title}" by ${album.artist} in stock.`;
    console.log(message);
    return `<p>${message}</p>`;
}

function getSongs(album) {
    let songsList = '';
    album.songs.forEach(song => {
        songsList += `${song}<br>`;
    });
    const message = `The album "${album.title}" includes the following songs:<br>${songsList}`;
    console.log(message);
    return `<p>${message}</p>`;
}

function getTotalAlbums(albumsData) {
    let totalAlbums = 0;
    albumsData.forEach((album) => {
        totalAlbums += parseInt(album.numCopies);
    });
    return `<p>The total number of albums in stock is ${totalAlbums}.</p>`;
   
}



