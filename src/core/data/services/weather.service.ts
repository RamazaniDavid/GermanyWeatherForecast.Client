const BASE_URL = process.env.VUE_APP_API_URL;

export default {
  async forecast(city: string, zipCode: string): Promise<any> {
    const requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `${BASE_URL}Forecast?city=${city}&zipCode=${zipCode}`,
      requestOptions
    );
    const data = await handleResponse(response);
    if (data.name) {
      const { name, current } = data;
      let viewedCity: { name: string; current: unknown }[] = JSON.parse(
        localStorage.getItem("viewedCity") ?? "[]"
      );
      try {
        viewedCity = viewedCity.filter((item) => item.name !== name);
      } catch (error) {
        viewedCity = [];
      }
      viewedCity.push({ name, current });
      localStorage.setItem("viewedCity", JSON.stringify(viewedCity));
    }
    return data;
  },
  async currentInfo(city: string, zipCode: string): Promise<any> {
    const requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `${BASE_URL}Current?city=${city}&zipCode=${zipCode}`,
      requestOptions
    );
    const data = await handleResponse(response);
    return data;
  },
  async searchByCityName(cityExpr: string): Promise<[]> {
    const requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `${BASE_URL}SearchByCityName?cityExpr=${cityExpr}`,
      requestOptions
    );
    const data = await handleResponse(response);

    return data;
  },
};

function handleResponse(response: Response) {
  if (!response.ok) {
    const error =
      response.statusText?.length > 0
        ? response.statusText
        : response.status === 404
        ? "Not Found"
        : "";
    return Promise.reject(error);
  }
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
