if(!localStorage.getItem('DataBase')) {
  const newDataBase = [];
  const date = new Date().toLocaleString().split(", ")[0];

  for(let i = 0; i < 10; i++) {
    newDataBase.push({
       Id: i,
       Date: date,
       Text: "Text for example",
       Selected: false
    });
  }

  localStorage.setItem('DataBase', JSON.stringify(newDataBase))
}
