window.addEventListener('load', () => {
  const List = document.querySelector('.list');

  const getDataBase = () => {
    const currentDataBase = localStorage.getItem('DataBase');
    if(currentDataBase && currentDataBase[0]) {
        return(JSON.parse(currentDataBase))
    }

    return false;
  }

  const setDataBase = newDataBase => {
      localStorage.setItem('DataBase', JSON.stringify(newDataBase))
  }

  const createItem = (itemData) => {
    const newItem = document.createElement('div');
    newItem.classList.add('todo__wrapper-form');
    newItem.setAttribute('id', itemData.Id);

    newItem.innerHTML = `
      <div class="todo__wrapper-checked-btn">
        <div class="todo__checked-wrapper">
          <label class="checkbox">
            <input class="todo__checked checkbox__input" name="checkbox" type="checkbox" ${itemData.Selected ? "checked" : ""}>
            <em class="checkbox__body"></em>
          </label>
          <span class="todo__date-create-todo">${itemData.Date}</span>
        </div>
        <div class="todo__wrapper-btn">
          <button class="btn todo__btn-edit">
            <svg class="edit-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="white"/>
              <path d="M9 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V15" stroke="#889DEA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 15H12L20.5 6.49997C20.8978 6.10214 21.1213 5.56258 21.1213 4.99997C21.1213 4.43736 20.8978 3.89779 20.5 3.49997C20.1022 3.10214 19.5626 2.87865 19 2.87865C18.4374 2.87865 17.8978 3.10214 17.5 3.49997L9 12V15Z" stroke="#889DEA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 5L19 8" stroke="#889DEA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg class="save-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.99998 12L9.99998 17L20 7.00001" stroke="#889DEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="btn todo__btn-remove">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7.00006H20" stroke="#AFAFAF" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 10.9999V16.9999" stroke="#AFAFAF" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 10.9999V16.9999" stroke="#AFAFAF" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 7.00006L6 19.0001C6 19.5305 6.21071 20.0392 6.58579 20.4143C6.96086 20.7893 7.46957 21.0001 8 21.0001H16C16.5304 21.0001 17.0391 20.7893 17.4142 20.4143C17.7893 20.0392 18 19.5305 18 19.0001L19 7.00006" stroke="#AFAFAF" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#AFAFAF" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          
          </button>
        </div>
      </div>
      <div class="todo__input-text">
        <textarea placeholder="Please enter task description" value="${itemData.Text}">${itemData.Text}</textarea>
        <div class="todo__text ${itemData.Selected ? "strike" : ""}">${itemData.Text}</div>
      </div>
    `;

    const editClassName = 'editing';
    const currentDataBase = getDataBase();
    const savingItem = currentDataBase.find(item => item.Id === itemData.Id);
    const itemIndex = currentDataBase.findIndex(item => item.Id === itemData.Id);

    const edit = () => {
      newItem.classList.add(editClassName);
    };

    const save = () => {
      newItem.classList.remove(editClassName);
      currentDataBase[itemIndex].Text = newItem.querySelector('textarea').value;

      setDataBase(currentDataBase);
      createList();
    };
    
    newItem.querySelector('.todo__btn-edit').addEventListener('click', () => {
      newItem.classList.contains(editClassName) ? save() : edit();
    });
    
    newItem.querySelector('.todo__btn-remove').addEventListener('click', () => {
      const question = confirm("Are you sure? It can't be restore");

      if(question) {
        currentDataBase.splice(itemIndex, 1);
        setDataBase(currentDataBase);
        createList();
      }
    });

    newItem.querySelector('.todo__checked').addEventListener('change', e => {
      currentDataBase[itemIndex].Selected = e.target.checked;
      console.log(currentDataBase)
      setDataBase(currentDataBase);
      createList();
    });

    return newItem;
  }

  const createList = () => {
    const showCountContainer = document.querySelector('.header__item-count-number.scope');
    const showActiveCount = document.querySelector('.header__item-count-number.selected');
    let activeCount = 0;
    List.innerHTML = '';
    const currentDataBase = getDataBase();
    if(currentDataBase.length > 0) currentDataBase.forEach(dataBaseItem => List.append(createItem(dataBaseItem)));

    showCountContainer.innerHTML = String(currentDataBase.length);
    currentDataBase.forEach(item => item.Selected ? activeCount = activeCount + 1 : activeCount);
    showActiveCount.innerHTML = String(activeCount);
  }

  
  const createNew = () => {
    const currentDataBase = getDataBase();
    const lastItem = !!currentDataBase[0] ? currentDataBase[currentDataBase.length - 1 ] : false;
    
    const newItem = {
      Id: lastItem ? lastItem.Id + 1 : 0,
      Text: "New text",
      Date: new Date().toLocaleString().split(", ")[0],
      Selected: false
    }

    currentDataBase.push(newItem);
    setDataBase(currentDataBase);
    createList();
  };

  document.querySelector('.todo__create-task-btn').addEventListener('click', createNew);
  document.querySelector('.header__add-button').addEventListener('click', createNew);

  createList()

});