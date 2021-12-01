export interface LoginParams {
  Username: string;
  Password: string;
}

export interface LoginResult {
  CSRFToken: string;
}
