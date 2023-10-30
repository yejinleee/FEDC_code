let afterContainer = document.getElementById("afterContainer");
afterContainer.innerHTML = "afterContainer";
let afterDiv = document.createElement("span");
afterDiv.style.background = "beige";
afterDiv.innerHTML = "after로 추가한 span";
afterContainer.after(afterDiv);

let appendContainer = document.getElementById("appendContainer");
appendContainer.innerHTML = "appendContainer";
let appendDiv = document.createElement("span");
appendDiv.style.background = "beige";
appendDiv.innerHTML = "append로 추가한 span";
appendContainer.append(appendDiv);
console.log(appendContainer.outerHTML);

let beforeContainer = document.getElementById("beforeContainer");
beforeContainer.innerHTML = "beforeContainer";
let beforeDiv = document.createElement("span");
beforeDiv.style.background = "beige";
beforeDiv.innerHTML = "before로 추가한 span";
beforeContainer.before(beforeDiv);

let prependContainer = document.getElementById("prependContainer");
prependContainer.innerHTML = "prependContainer";
let prependDiv = document.createElement("span");
prependDiv.style.background = "beige";
prependDiv.innerHTML = "prepend로 추가한 span";
prependContainer.prepend(prependDiv);
