export default class GithubApi {
  _apiBaseUrl = 'https://api.github.com';

  async getUser(name) {
    const res = await fetch(`${this._apiBaseUrl + '/users/' + name}`);
    if (!res.ok) return res.ok;

    return await res.json();
  }
}

