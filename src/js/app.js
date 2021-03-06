import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function() {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');
    DOM.$listCards = $('list-cards');
    
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createTabs() {}
  function createDialogs() {}

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    console.log("This should create a new list");
  }

  function deleteList() {
    $(this).closest('.list').remove();
    console.log("This should delete the list you clicked on");
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    let nameinput = $(this).find('input');
    let name = nameinput.val();
    console.log("This should create a new card");
    $(this)
      .closest('.add-new')
        .append()
          .before(`<li class="card"> ${name} <button class="button delete">X</button></li>`);
    
    $(this).find('input').val('');
    
  }

  function moveColumns() {
    DOM.$columns.sortable({
      connectWith: DOM.$columns
    });
  }

  function moveCards(){
    DOM.$listCards.sortable({
      connectWith: DOM.$listCards
    });
  }

  function createDialogs(){
    DOM.$newListButton.dialog({
      autoopen: false
    });
  }

  function deleteCard() {
    console.log("This should delete the card you clicked on");
    $(this).closest('li.card').remove();    
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();
    
    bindEvents();
    moveColumns();
    moveCards();
  }

  // All kod här
  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
});
