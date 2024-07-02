async function searchPlaylist(){
    const downloadButton = document.querySelector('button');
    downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    document.getElementById('downloadLinks').style.display = "flex";
    document.getElementById('downloadLinks').innerHTML = "";

    try {
        const url = document.getElementById('urlSosmed').value;
        if (url.trim() === '') {
            document.getElementById('downloadLinks').innerHTML = `<p style="color: #ff0000;">Url tidak boleh kosong!</p>`;
            return;
        }
        const supportedUrls = ['spotify.com/track', 'spotify.com/playlist'];

        if (!supportedUrls.some(supportedUrl => url.includes(supportedUrl))) {
            document.getElementById('downloadLinks').innerHTML = `<p style="color: #ff0000;">Unsupported URL! Hanya support tt/ig/fb</p>`;
            return;
        }

        const sptfyTrack = `https://itzpire.com/download/spotify?url=${encodeURIComponent(url)}`
        const sptfyPlaylist = `https://api.mininxd.my.id/spotify?url=${encodeURIComponent(url)}`
        
        let response, data;
        let downloadLinks = '';  // Initialize downloadLinks

        if (url.includes('spotify.com/track')) {
            response = await fetch(sptfyTrack);
            data = await response.json();
            downloadButton.style.display = "none";
            
            downloadLinks += `<p>${data.data.title} │ ${data.data.artist} </p>`;
            downloadLinks += `<a href="${data.data.download}" download>Download Musik</a>`;

            
        } else if (url.includes('spotify.com/playlist')) {
            response = await fetch(sptfyPlaylist);
            let data = await response.json();
            console.log(data)
            console.log(data.description)
            downloadLinks += `
            <div id="container-image-playlist">
            <img src="${data.images[0].url}" alt="image_playlist" id="image-playlist">
            </div>
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <p>${data.owner.display_name}</p>
            <p>
            <span class="material-symbols-outlined">language</span>
            ${data.tracks.total} songs
            </p>
            `;
            data.tracks.items.forEach(item => {
                downloadLinks += `
                <div id="container-downloader-song">
                    <div id="container-song">
                        <img src="${item.track.album.images[1].url}" alt="image_album" id="image-album">
                        <div id="container-track">
                            <a href="">${item.track.name}</a>
                            <p>${item.track.artists[0].name}</p>
                        </div>
                    </div>
                    <div id="container-download">
                        <button id="download-song" onclick="downloadPlaylistButton()"><span class="material-symbols-outlined">download</span></button>
                    </div>
                    </div>
                    `;
            })
    } else {
        throw new Error('Unsupported URL!');
    }
    console.log('URL:', url);
    console.log('Response:', response);
    console.log('Data:', data);
    console.log('Download Links:', downloadLinks);
    document.getElementById('downloadLinks').innerHTML = downloadLinks;
} catch (error) {
    if (error.message === 'Unsupported URL!') {
        alert("Unsupported URL!, Hanya support fb/ig/tt/yt");
    } else {
        document.getElementById('downloadLinks').innerHTML = `<p style="color: #ff0000;">Terjadi Error, pastikan link yg ingin di download bukanlah private atau coba periksa koneksi internet anda</p>`;
    }
    console.log(error.message);
} finally {
        downloadButton.innerHTML = 'Download';
    }
}



/*document.getElementById("download-song").addEventListener("click", function() {
});*/

function getValue(){
    const downloadButton = document.querySelector('button');
    downloadButton.style.display = "block";
    document.getElementById('downloadLinks').style.display = "none";
}
