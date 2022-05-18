let html =` 
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
 
    for(let i=0; i < data.length; i++){
    let eachMusic = `
    <tr id="rowId">
         <th scope="row">${i+1}</th>
          <td>${data[i].title}</td>
          <td id="actionBtnId" onclick = "removePlayList('${data[i].songId}')"> 
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