export class Env {
  public static readonly NODE_ENV = process.env.NODE_ENV;
  public static readonly CONNECTION_STRING = process.env.CONNECTION_STRING;
  public static readonly GOOGLE_CLIENT_ID =
    process.env.GOOGLE_CLIENT_ID || "";
  public static readonly GOOGLE_CLIENT_SECRET =
    process.env.GOOGLE_CLIENT_SECRET || "";
}
