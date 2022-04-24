const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  try {
    const { data } = await axios.get(APIURL + username);

    createUserCard(data);
  } catch (error) {
    if (error.response.status === 404) {
      createErrorCard("Bu Kullanıcı GitHub'da Mevcut Değil");
    }
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
        <div id="repos">
          <a href="#" class="repos">Repo 1</a>
          <a href="#" class="repos">Repo 2</a>
          <a href="#" class="repos">Repo 3</a>
        </div>
      </ul>
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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUser(user);

    search.value = "";
  }
});
