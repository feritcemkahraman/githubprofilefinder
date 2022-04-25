const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  try {
    const { data } = await axios.get(APIURL + username);

    createUserCard(data);
    getRepos(username);
  } catch (error) {
    if (error.response.status === 404) {
      createErrorCard("Bu Kullanıcı GitHub'da Mevcut Değil");
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios.get(APIURL + username + "/repos?sort=created");

    addReposToCard(data);
  } catch (error) {
    createErrorCard("Hiçbir Proje Yayınlanmamış");
  }
}

function createUserCard(user) {
  const cardHTML = `
    
    <div class="card" data-tilt>
    <div>
      <img
        src="${user.avatar_url}"
        alt="${user.name}"
        class="avatar"
      />
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>
        ${user.bio}
      </p>
      <ul>
        <li>${user.followers} <strong>Takipçi</strong></li>
        <li>${user.following} <strong>Takip Edilen</strong></li>
        <li>${user.public_repos} <strong>Repository</strong></li>
        </ul>
        <div id="reposList">
          
        </div>
     </div>
    `;
  main.innerHTML = cardHTML;
}

function createErrorCard(error) {
  const cardHTML = `
    <div class="card">
      <div class="error">
        <h3>${error}</h3>
      </div>
    </div>
  `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("reposList");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repos");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUser(user);

    search.value = "";
  }
});
