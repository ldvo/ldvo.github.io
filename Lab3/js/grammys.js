fetch('./data/grammys.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
