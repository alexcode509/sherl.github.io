document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const uploadForm = document.getElementById('uploadForm');
    
    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'dashboard.html';
                } else {
                    document.getElementById('errorMessage').textContent = 'Invalid credentials';
                }
            });
        });
    }

    // Handle video upload
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const videoFile = document.getElementById('videoFile').files[0];
            const formData = new FormData();
            formData.append('video', videoFile);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('uploadMessage').textContent = 'Video uploaded successfully!';
                    fetchVideos();
                } else {
                    document.getElementById('uploadMessage').textContent = 'Video upload failed.';
                }
            });
        });

        // Fetch and display videos
        function fetchVideos() {
            fetch('/videos')
            .then(response => response.json())
            .then(videos => {
                const videoList = document.getElementById('videoList');
                videoList.innerHTML = '';
                videos.forEach(video => {
                    const li = document.createElement('li');
                    li.textContent = video;
                    videoList.appendChild(li);
                });
            });
        }

        fetchVideos();
    }
});
