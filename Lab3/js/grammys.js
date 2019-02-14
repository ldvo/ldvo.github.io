let jsonData;

fetch('https://ldvo.github.io/Lab3/data/grammys.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      jsonData = data;
      data.fields.forEach((element) => {
        $('<option>', {id: element.field_id, text: element.field})
            .appendTo('#category_types');
      })
      loadField(data.fields[0]);
      $('#category_types').change(() => {
        let select = $('#category_types')[0];
        loadField(jsonData.fields[select.selectedIndex]);
      })
    })

function loadField(field) {
  $('#nominees_section').empty()
  $('<h2>', {text: field.field}).appendTo('#nominees_section');
  $('<p>', {text: field.description}).appendTo('#nominees_section');
  field.categories.forEach((category) => {
    $('<h3>', {text: category.category_name}).appendTo('#nominees_section');
    let list = $('<ul>');
    let index = 0;
    category.nominees.forEach((nominee) => {
      let listItem = $('<li>', {text: nominee.nominee}).appendTo(list);
      if (index === category.winner_id) {
        $('<span>', {class: 'winner', text: 'WINNER'}).appendTo(listItem);
      }
      $('<p>', {text: nominee.artist}).appendTo(listItem);
      $('<p>', {text: nominee.info}).appendTo(listItem);
      index++;
    })
    list.appendTo(nominees_section);
  })
}
