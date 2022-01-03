document.body.innerHTML=`

<div class="header">
<a href="https://github.com/" target=_blank>
<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path> 
</svg></a>
<p class="Main-head" id="reponav">GITHUB</p>
</div>

<div class="body">

<div class="row">
<div class="left col-xs-12  col-md-4 ">


<div class="inputbox input-group mb-3">
  <input type="text" class="name form-control" placeholder="Enter Username" aria-label="Recipient's username" aria-describedby="button-addon2">
  <button class="btn btn-outline-secondary" type="button"onclick="get()" id="button-addon2">Search</button>
</div>

<div class="img"></div>

<div class="profilename"></div>

<div class="public_repos"></div>

</div>


<div class=" right col-xs-12  col-md-8">
<h1 class="repheader" > Repository</h1>
<div class="reposit"></div> 
<div class="top" ></div>
  </div>

</div>

<div class="row"> 
 <div class="footerleft col-xs-12  col-md-4"> </div>
   <div class="footerright col-xs-12  col-md-8"></div>  
    
</div>
</div>`

// Fetching Data From GitHub
async function get()
{
    let username=document.querySelector('.name').value;
    username=username.split(' ').join('');

    let data=await fetch(`https://api.github.com/users/${username}`);
    let getdata=await data.json();


    let profilepic=document.querySelector('.img');
    profilepic.innerHTML=`<img src="${getdata.avatar_url} class="profilepic" title="${username}" alt="${username}">`;

    let profilename=document.querySelector('.profilename');
    profilename.innerHTML=username;

    let public_repos=document.querySelector('.public_repos');
    public_repos.innerHTML=`<p>Repositories: ${getdata.public_repos}</p>   <p> Followers: ${getdata.followers}      Following: ${getdata.following}</p>
    <p>Bio:  ${getdata.bio}</p>
    <p>Blog:  ${getdata.blog}</p>
    <p>Joined: ${getdata.created_at}</p>`;


    let getreposit= await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    let aftergetreposit=await getreposit.json();
    console.log(aftergetreposit);


    let userdata=document.querySelector('.reposit');
    userdata.innerHTML="";
    aftergetreposit.forEach(data => 
    {      
        userdata.innerHTML+=`
                            <ul>
                                <li><p><a class="repolink" href="${data.html_url}" target="_blank">${data.full_name}</a></p>
                             <p class="star-fork">    <p class="far fa-star">Star count- ${data.stargazers_count}</p> 
                              <p><i class="fas fa-code-branch"></i>fork count-${data.forks_count}</p> </p> </li>
                            </ul>`;       
    
    });

     document.querySelector('.top').innerHTML=`<a href="#reponav"><div class="fas fa-arrow-circle-up" ></div></a>`

}





























