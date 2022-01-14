window.addEventListener("load", function () {
  var leftMore = document.querySelector(".leftmore");
  var rightMore = document.querySelector(".rightmore");
  var focus = document.querySelector(".focus");

  focus.addEventListener("mouseenter", function () {
    leftMore.style.display = "block";
    rightMore.style.display = "block";
    clearInterval(timer);
    timer = null;
  });

  focus.addEventListener("mouseleave", function () {
    leftMore.style.display = "none";
    rightMore.style.display = "none";
    timer = setInterval(() => {
      rightMore.click();
    }, 2000);
  });

  var ul = focus.querySelector("ul");
  var length = ul.children.length;
  var ol = focus.querySelector(".dots");
  var focusWidth = focus.offsetWidth;

  for (var i = 0; i < length; i++) {
    var li = document.createElement("li");
    li.setAttribute("index", i);
    ol.appendChild(li);
    // add event listener to each item of the order list
    li.addEventListener("click", function () {
      for (var i = 0; i < length; i++) {
        ol.children[i].className = "";
      }
      this.className = "current";
      var index = this.getAttribute("index");
      num = index;
      circle = index;
      animate(ul, -(focusWidth * index));
    });
  }

  ol.children[0].className = "current";
  var num = 0;
  var circle = 0;
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  var flag = true;

  rightMore.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -(focusWidth * num), function () {
        flag = true;
      });
      circle++;
      if (circle == length) {
        circle = 0;
      }
      dotChange();
    }
  });

  leftMore.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = length - 1;
        ul.style.left = -num * focusWidth + "px";
      }
      num--;
      animate(ul, -(focusWidth * num), function () {
        flag = true;
      });
      circle--;
      if (circle < 0) {
        circle = length - 1;
      }
      dotChange();
    }
  });
  function dotChange() {
    for (var i = 0; i < length; i++) {
      ol.children[i].className = "";
    }
    ol.children[circle].className = "current";
  }

  var timer = setInterval(() => {
    rightMore.click();
  }, 2000);
});
