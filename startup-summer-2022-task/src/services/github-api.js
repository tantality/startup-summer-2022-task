export default class GithubApi {
  _apiBaseUrl = 'https://api.github.com';

  async getUser(name) {
    const res = await fetch(`${this._apiBaseUrl + '/users/' + name}`);

    if (!res.ok) return res.ok;

    return await res.json();
  }

  async getReposList(name, perPage, currentPage) {
    const res = await fetch(`${this._apiBaseUrl + '/users/' + name + '/repos?per_page=' + perPage + '&page=' + currentPage}`);

    if (!res.ok) return [];

    return await res.json();
  }
}

