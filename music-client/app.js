const PATH = 'http://localhost:3000';
window.onload = function(){
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
    const logoutBtn = document.getElementById("logoutBtnId");
    //const musicDisplayEl = document.getElementById("musicDisplayId");
    loginBtn.onclick = loginFn;
    logoutBtn.onclick = logoutFn;
    searchBtn.onclick = searchFn;
    if(localStorage.getItem('accessToken')){
        displayLogoutHideLogin();
    }else{
        hideLogoutDisplayLogin;
    }
    
    function loginFn(){
    const username = usernameEl.value;
    const password = passwordEl.value;
    console.log("somthing....", username, password)
    fetch(`${PATH}/api/auth/login`,{
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

  function loggedInProperties(data){
    usernameEl.value = "";
    passwordEl.value ="";
      if(data.status){
      errorEl.innerHTML = data.message;
      }else{
       localStorage.setItem('accessToken', data.accessToken);
       displayLogoutHideLogin();
     }
  }
//   function fetchMusic(){
//     fetch(`${PATH}/api/music`, {
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//         }
//     })
//      .then(response=> response.json())
//      .then(songs => console.log(songs));
//   }


  async function fetchMusic(){
   const response = await fetch(`${PATH}/api/music`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
     })
    const data =  await response.json();
    console.log("processed data&lngth", data, "lengthhh", data.length)
    let html =` 
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

    for(let i=0; i < data.length; i++){
    let eachMusic = `
    <tr id="rowId">
         <th scope="row">${i+1}</th>
          <td>${data[i].title}</td>
          <td>${data[i].releaseDate}</td>
          <td><button onclick = 'addToPlayList(${i+1})'>+</button></td>
          
          

    </tr>`;
    html += eachMusic;
    };
    html+= `
     </tbody>
     </table>`;
     bodyEl.innerHTML = html;
  }
  
  async function fetchPlayList(){
    const response = await fetch(`${PATH}/api/playlist`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
     })
    const data =  await response.json();
    console.log("processed playMusic", data, "playlislength", data.length)
    let html =` 
    <table class="table caption-top table-secondary  table-striped">
    <caption>Song Your Play List</caption>
    <thead>
    <tr>
      <th scope="col">Order</th>
      <th scope="col">Title</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>`;
 
    for(let i=0; i < data.length; i++){
    let eachMusic = `
    <tr id="rowId">
         <th scope="row">${i+1}</th>
          <td>${data[i].title}</td>
          <td id="actionBtnId"> 
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
    html+= `
     </tbody>
     </table>`;
     playListEl.innerHTML = html;
  }
  function logoutFn(){
      localStorage.removeItem('accessToken');
      hideLogoutDisplayLogin();
      playListEl.innerHTML = "";
      bodyEl.innerHTML = "WELCOME TO MIU MUSIC STATION";

  }
  function displayLogoutHideLogin(){
      search.style.display = 'block';
      logoutBtn.style.display = 'block';
      loginEl.style.display = 'none';
      fetchMusic();
      fetchPlayList();

    
  }
  function hideLogoutDisplayLogin(){
    search.style.display = 'none';
    logoutBtn.style.display = 'none';
    loginEl.style.display = 'block';
  }
async function searchFn(){
const searchValue = searchTxt.value;
 if(searchValue == ""){
    fetchMusic();

 }else{
     bodyEl.value = "";
    const response = await fetch(`${PATH}/api/music?search=${searchValue}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
     })
    const data =  await response.json();
    console.log("processed searchdata", data)
    let html =` 
    <table class="table caption-top table-secondary table-striped">
    <caption>Search result</caption>
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Release Date</th>
    </tr>
  </thead>
  <tbody>
    <tr id="rowId">
         <th scope="row">1</th>
          <td>${data[0].title}</td>
          <td>${data[0].releaseDate}</td>
          
     </tr>
   

     </tbody>
     </table>`;
     bodyEl.innerHTML = html;
     searchTxt.value = "";
 }
}
 function addToPlayList(el){
     console.log(el);
 }
}
//   <td id="actionBtnId" onclick = "addToPlayList(${this});">+</td>