fetch('https://api.github.com/users/TConnor2003')
.then(response => response.json())
.then(data => {
    var username = data.login;
    typeWriter(username, "username", 50);

    var public_repos = data.public_repos;
    typeWriter(public_repos, "public_repos", 50);

    var url = data.html_url;
    typeWriter(url, "url", 25);
});

function typeWriter(data, elementId, speed) {
    if (typeof data === 'number') {
        data = data.toString();
    }
    if (data.startsWith("http://")) {
        data = data.replace("http://", "");
    } else
    if (data.startsWith("https://")) {
        data = data.replace("https://", "");
    }
    document.getElementById(elementId).innerHTML = "";
    var i = 0;
    var txt = data;
    function type() {
      if (i < txt.length) {
        document.getElementById(elementId).innerHTML += txt.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }