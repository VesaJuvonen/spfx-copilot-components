export interface IHolidayHttpResponse {
  ok: boolean;
  status: number;
  json(): Promise<Record<string, unknown>>;
}

export interface IHolidayHttpClient {
  get(url: string, headers: { [name: string]: string }): Promise<IHolidayHttpResponse>;
}