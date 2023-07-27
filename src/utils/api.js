import axios from "axios";

export const API_URL = "https://www.cbr-xml-daily.ru/";

class ApiClient {
  constructor(url) {
    this.api = axios.create({
      baseURL: url,
      timeout: 5000,
    });
  }

  async getValutes() {
    try {
      const response = await this.api.get("/daily_json.js");
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

export const api = new ApiClient(API_URL);


