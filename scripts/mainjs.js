const scrollToElement = (id) => {
    const element = document.querySelector(id);

    if (element !== null) {
        element.classList.remove('hidden');
        element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
};

document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        if (location.hash !== '') {
            scrollToElement(location.hash);
        }
    }
};
function search_info() {
    let input = document.getElementById('searchInput').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('infolist');
   
    for (i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
      }
      else {
        x[i].style.display = "list-item";
      }
    }
  }