export default class SearchInfo {
  constructor(baseUrl, params, headers) {
    this.baseUrl = baseUrl;
    this.params = params;
    this.headers = headers;
    const queryParams = new URLSearchParams(params).toString();
    this.url = baseUrl + (this.baseUrl.endsWith("?") ? "" : "?") + queryParams;
  }

  updateUrl(newParams) {
    // Merge existing parameters with the new ones (will overwrite with new value if the key(s) already exits)
    this.params = { ...this.params, ...newParams };
    const queryParams = new URLSearchParams(this.params).toString();
    this.url =
      this.baseUrl + (this.baseUrl.endsWith("?") ? "" : "?") + queryParams;
  }
}
