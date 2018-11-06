const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  let newTexti;

  function init(_form, _items) {
    items = _items;
    form = _form;

    newTexti = form.querySelector('.form__input');

    _form.addEventListener('submit', formHandler);
    items.addEventListener('click', deleteItem);
    items.addEventListener('click', finish);
    items.addEventListener('click', edit);
    items.addEventListener('keyup', commit);

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();

    let texti = newTexti.value;
    if (texti.trim() != "") {
      add(texti);
      newTexti.value = "";
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const {
      target
    } = e;
    if (target.type == 'checkbox') {
      target.parentNode.classList.toggle('item--done');
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const {
      target
    } = e;
    const input = el('input', 'item__edit');
    input.value = target.textContent;
    let parent = target.parentNode;
    if (target.className == 'item__text') {
      parent.removeChild(target);
      parent.insertBefore(input, parent.querySelector('.item__button'));
      input.focus();
    }
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const {
      target
    } = e;
    if (event.keyCode == ENTER_KEYCODE) {
      let editSpan = el('span', 'item__text');
      editSpan.textContent = target.value;
      let parent = target.parentNode;
      parent.replaceChild(editSpan, target);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const listItem = el('li', 'item');
    const listCheckbox = el('input', 'item__checkbox');
    listCheckbox.setAttribute('type', 'checkbox');
    const listSpan = el('span', 'item__text');
    listSpan.appendChild(document.createTextNode(value));
    const listButton = el('button', 'item__button');
    listButton.appendChild(document.createTextNode('Eyða'));

    listItem.appendChild(listCheckbox);
    listItem.appendChild(listSpan);
    listItem.appendChild(listButton);

    document.getElementById('listi').appendChild(listItem);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const {
      target
    } = e;
    if (target.type == 'submit') {
      items.removeChild(target.parentNode);
    }
  }

  // hjálparfall til að útbúa element
  function el(type, className) {
    let el = document.createElement(type);
    if (className) {
      el.classList.add(className);
    }
    return el;
  }

  return {
    init: init
  }
})();