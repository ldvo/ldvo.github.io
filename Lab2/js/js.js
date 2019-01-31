var list = document.getElementById('list');
var input = document.getElementById('newitem');
var valueCounter = 1;

list.childNodes.forEach((child) => {
  if (child.tagName === 'LI') {
    child.firstChild.value = getCurrentValue();
  }
})

input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && input.value !== '') {
    var newElement = document.createElement('LI');
    newElement.innerHTML =
        '<input type="checkbox" name="todo"><span>' + input.value + '</span>';
    newElement.firstChild.value = getCurrentValue();
    list.appendChild(newElement);
    input.value = '';
  }
})

list.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT') {
    var listItem = e.target.parentElement;
    var span = listItem.lastChild;
    if (e.target.checked) {
      span.classList.add('done');
    } else {
      span.classList.remove('done');
    }
  }
}, false);

function getCurrentValue() {
  return valueCounter++;
}