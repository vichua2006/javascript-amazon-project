// using HTTP hypertext transfer protocol to send message

const xhr = new XMLHttpRequest();

// also add listener to xml object to ensure that response is loaded
xhr.addEventListener("load", () => {
    console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev/whatever");
xhr.send();