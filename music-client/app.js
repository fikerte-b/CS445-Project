const PATH = 'http://localhost:3000';
window.onload = function () {
  const bodyEl = document.getElementById("bodyId");
  const playListEl = document.getElementById("playListId");
  const usernameEl = document.getElementById("userNameId");
  const passwordEl = document.getElementById("passwordId");
  const loginEl = document.getElementById("loginId");
  const loginBtn = document.getElementById("loginBtnId");
  const errorEl = document.getElementById("errorId");
  const search = document.getElementById("searchIdDiv");
  const searchTxt = document.getElementById("searchId");
  const searchBtn = document.getElementById("searchBtnId");
  const footerEl = document.getElementById("footerId");
  const logoutBtn = document.getElementById("logoutBtnId");
  //const imgEl = document.getElementById("imgId");


  loginBtn.onclick = loginFn;
  logoutBtn.onclick = logoutFn;
  searchBtn.onclick = searchFn;

  if (localStorage.getItem('accessToken')) {
    displayLogoutHideLogin();
  } else {
    hideLogoutDisplayLogin();
  }


  // login function=======
  function loginFn() {
    const username = usernameEl.value;
    const password = passwordEl.value;
    console.log("somthing....", username, password)
    fetch(`${PATH}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => loggedInProperties(data));
  }


  // function for logged in features==================================
  function loggedInProperties(data) {
    usernameEl.value = "";
    passwordEl.value = "";
    if (data.status) {
      errorEl.innerHTML = data.message;
    } else {
      localStorage.setItem('accessToken', data.accessToken);
      displayLogoutHideLogin();
    }
  }


  // add to music to the may interst u page================================
  async function fetchMusic() {
    const response = await fetch(`${PATH}/api/music`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    const data = await response.json();
    console.log("processed data&lngth", data, "lengthhh", data.length)
    let html = ` 
    <table class="table caption-top table-secondary table-striped">
    <caption>Song you may interest</caption>
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Release Date</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>`;

    for (let i = 0; i < data.length; i++) {
      let eachMusic = `
    <tr id="rowId">
         <th scope="row">${i + 1}</th>
          <td>${data[i].title}</td>
          <td>${data[i].releaseDate}</td>
          <td id="plusId" onclick = "addToPlayList('${data[i].id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
          </svg>
          </td>
    </tr>`;
      html += eachMusic;
    };
    html += `
     </tbody>
     </table>`;
    bodyEl.innerHTML = html;
  }


  // displaying play list=====================================
  async function fetchPlayList() {
    const response = await fetch(`${PATH}/api/playlist`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    const data = await response.json();
    console.log("processed playMusic", data, "playlislength", data.length)
    let html = ` 
    <table class="table caption-top table-secondary  table-striped">
    <caption class="fs-3 fw-bold">Your Play List</caption>
    <thead>
    <tr>
      <th scope="col">Order</th>
      <th scope="col">Title</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>`;

    for (let i = 0; i < data.length; i++) {
      let eachMusic = `
    <tr id="rowId">
         <th scope="row">${i + 1}</th>
          <td>${data[i].title}</td>
          <td id="actionBtnId"><span onclick = "removePlayList('${data[i].songId}')">
          <img id="removeId" src="./images/xSign.png" alt="" height='14' width='14'></span>
          &nbsp &nbsp
          <span><svg id="arrowId" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-caret-right-fill" viewBox="0 0 16 16">
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg></span>
          
           </td>
    </tr>`;
      html += eachMusic;
    };
    html += `
     </tbody>
     </table>`;
    playListEl.innerHTML = html;
  }


  // log out function======================
  function logoutFn() {
    localStorage.removeItem('accessToken');
    hideLogoutDisplayLogin();
    playListEl.innerHTML = "";
    bodyEl.innerHTML = "WELCOME TO MIU MUSIC STATION";
    errorEl.innerHTML = "";
    // imgEl.innerHTML = `<img  style= "width:400px" src ="./images/imgLog.png">.....Where You Can Find Relaxing Songs!`

  }

  // visibling logout button helper function====================================
  function displayLogoutHideLogin() {
    search.style.display = 'block';
    logoutBtn.style.display = 'block';
    footerEl.style.display = 'block';
    loginEl.style.display = 'none';
    fetchMusic();
    fetchPlayList();
  }


  // visibling login button helper function====================================
  function hideLogoutDisplayLogin() {
    search.style.display = 'none';
    logoutBtn.style.display = 'none';
    footerEl.style.display = 'none';
    loginEl.style.display = 'block';
  }


  //search function============================
  async function searchFn() {
    const searchValue = searchTxt.value;
    if (searchValue == "") {
      fetchMusic();

    } else {
      bodyEl.value = "";
      const response = await fetch(`${PATH}/api/music?search=${searchValue}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      const data = await response.json();
      console.log("processed searchdata", data)
      let html = ` 
    <table class="table caption-top table-secondary table-striped">
    <caption>Search result</caption>
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Release Date</th>
    </tr>
  </thead>
  <tbody>`;
      for (let i = 0; i < data.length; i++) {
        let eachMusic =
          `<tr id="rowId">
         <th scope="row">${i + 1}</th>
          <td>${data[i].title}</td>
          <td>${data[i].releaseDate}</td>
    </tr>`;
        html += eachMusic;
      };
      html += `
     </tbody>
     </table>`;
      bodyEl.innerHTML = html;

    }
    searchTxt.value = "";
  }
}




//add to play list function=======================================
async function addToPlayList(id) {
  const playListEl = document.getElementById("playListId");
  console.log("helllllllllllllloooo addddddddd=============");
  console.log("idddddddddd", id);

  const response = await fetch(`${PATH}/api/playlist/add`, {
    method: 'POST',
    body: JSON.stringify({
      songId: id
    }),
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json();
  console.log("dataaaaa", data);
  let html = ` 
    <table class="table caption-top table-secondary  table-striped">
    <caption class="fs-3 fw-bold">Your Play List</caption>
    <thead>
    <tr>
      <th scope="col">Order</th>
      <th scope="col">Title</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>`;

  for (let i = 0; i < data.length; i++) {
    let eachMusic = `
    <tr id="rowId">
         <th scope="row">${i + 1}</th>
          <td>${data[i].title}</td>
          <td id="actionBtnId" onclick = "removePlayList('${data[i].songId}')" > 
          <img id="removeId" src="./images/xSign.png" alt="" height='14' width='14'>
          &nbsp &nbsp
          <svg id="arrowId" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-caret-right-fill" viewBox="0 0 16 16">
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
          
           </td>
    </tr>`;
    html += eachMusic;
  };
  html += `
     </tbody>
     </table>`;
  playListEl.innerHTML = html;
}



// remove from play list function==============================
async function removePlayList(id) {
  const playListEl = document.getElementById("playListId");
  console.log("removeeeeeeeeeeeeeeeeeee", id);
  const response = await fetch(`${PATH}/api/playlist/remove`, {
    method: 'POST',
    body: JSON.stringify({
      songId: id
    }),
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json();
  console.log("Remove  dataaaaa", data);
  let html = ` 
    <table class="table caption-top table-secondary  table-striped">
    <caption class="fs-3 fw-bold">Your Play List</caption>
    <thead>
    <tr>
      <th scope="col">Order</th>
      <th scope="col">Title</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>`;
  
  for (let i = 0; i < data.length; i++) {
    let eachMusic = `
    <tr id="rowId">
         <th scope="row">${i + 1}</th>
          <td>${data[i].title}</td>
          <td id="actionBtnId"><span onclick = "removePlayList('${data[i].songId}')" > 
          <img id="removeId" src="./images/xSign.png" alt="" height='14' width='14'></span>
          &nbsp &nbsp
          <span><svg id="arrowId" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-caret-right-fill" viewBox="0 0 16 16">
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg></span>
          
           </td>
    </tr>`;
    html += eachMusic;
  };
  html += `
     </tbody>
     </table>`;
  playListEl.innerHTML = html;
}


