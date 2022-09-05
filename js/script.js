// Show off github repos
const overview = document.querySelector(".overview");
const username = "Frosty8104";
const list = document.querySelector(".repo-list");
const reposit = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
// Fetch and display user info
const fetchInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayInfo(data);
};
fetchInfo();
const displayInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure><img alt="user avatar" src=${data.avatar_url} /></figure>
    <div><p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:<strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p></div>`;
    overview.append(div);
    gitRepos();
};
// Fetch and display repository info
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};
const displayRepos = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        list.append(repoItem);
    }
};
// Add button to display fetched data
list.addEventListener = ("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});
// Fetch and display individual repository data
const specRepo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    // fetch languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // list languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
};
const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    reposit.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>`;
    repoData.append(div);
};
