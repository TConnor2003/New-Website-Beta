var itemname = "emmie";
var lowres = "/images/galleries/emmie/emmie";
var lowrestype = ".jpg";
var highres = "";
var highrestype = ".png";
var height = "300";
var width = "150";

/* if highres or highrestype are empty set to same as the low res versions */
if (highres == "") {
highres = lowres;
highrestype = lowrestype;
}
console.log(highres);
console.log(highrestype);


const titles = {
1:"Hello There!",
2:"General Kenobi!",
};

let i = 1;
while (imageExists(`${lowres}${i}${lowrestype}`)) {
document.write(`
<div class="gallery-item" onclick="showOverlay('${i}')">
<img src="${lowres}${i}${lowrestype}" class="gallery-image" alt="${itemname} ${i}" id="${i}" style="width: ${width}px; height: ${height}px;" />
</div>
`);
i++;
}

function imageExists(image_url) {
var http = new XMLHttpRequest();
http.open("HEAD", image_url, false);
http.send();
return http.status != 404;
}

function showOverlay(imageIndex) {
const overlay = document.createElement("div");
overlay.classList.add("overlay");
overlay.addEventListener("click", hideOverlay);

const image = document.createElement("img");
image.src = `${lowres}${imageIndex}${lowrestype}`;

const title = titles[imageIndex];

const titleBox = document.createElement("div");
titleBox.classList.add("title-box");
titleBox.textContent = `${itemname} ${imageIndex}${title ? ": " + title : ""}`;
overlay.appendChild(titleBox);

overlay.appendChild(image);

const downloadBox = document.createElement("div");
downloadBox.classList.add("download-box");

const copyUrlButton = document.createElement("button");
copyUrlButton.classList.add("download-button");
copyUrlButton.textContent = "Copy Download URL";
copyUrlButton.addEventListener("click", () => {
navigator.clipboard.writeText(image.src);
});

const copyCurrentUrlButton = document.createElement("button");
copyCurrentUrlButton.classList.add("download-button");
copyCurrentUrlButton.textContent = "Copy Current URL";
copyCurrentUrlButton.addEventListener("click", () => {
navigator.clipboard.writeText(window.location.href);
});

// Move the copy buttons to the download box
downloadBox.appendChild(copyUrlButton);
downloadBox.appendChild(copyCurrentUrlButton);

// Create a download button
const downloadButton = document.createElement("button");
downloadButton.classList.add("download-button");
downloadButton.innerHTML = '<i class="fa fa-download"></i> Download Uncompressed Image';
downloadButton.addEventListener("click", () => {
// Download the image
const xhr = new XMLHttpRequest();
xhr.open("GET", `${highres}${imageIndex}${highrestype}`);
xhr.responseType = "blob";
xhr.onload = () => {
if (xhr.status === 200) {
const blob = xhr.response;
const link = document.createElement("a");
link.href = window.URL.createObjectURL(blob);
link.download = `${itemname} ${imageIndex}${highrestype}`;
link.click();
} else {
console.error("Error downloading image:", xhr.status);
}
};
xhr.send();
});

downloadBox.appendChild(downloadButton);

overlay.appendChild(downloadBox);

document.body.appendChild(overlay);

setTimeout(() => {
overlay.classList.add("show");
}, 10);

// remove any existing hash from the URL bar
if (window.location.hash) {
window.history.pushState("", document.title, window.location.pathname);
}

// add the imageIndex to the URL bar as a hash
window.history.pushState({}, '', `#${imageIndex}`);
}


function hideOverlay() {
const overlay = document.querySelector(".overlay.show");
overlay.classList.remove("show");

setTimeout(() => {
overlay.remove();
}, 200);

// remove the hash from the URL bar
window.history.pushState("", document.title, window.location.pathname);
}

// scroll to the image specified in the URL hash when the page is loaded
window.addEventListener("load", () => {
const hash = window.location.hash;
if (hash) {
const id = hash.slice(1);
const element = document.getElementById(id);
if (element) {
element.scrollIntoView();
showOverlay(id);
}
}
});
window.addEventListener("hashchange", () => {
// Check the new hash
const newHash = window.location.hash;

// If the new hash is different from the old hash,
// scroll to the image specified in the new hash
if (newHash !== window.oldHash) {
const id = newHash.slice(1);
const element = document.getElementById(id);
if (element) {
element.scrollIntoView();
showOverlay(id);
}
}

// Save the new hash as the old hash
window.oldHash = newHash;
});