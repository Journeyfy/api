import _ from "lodash";

export class Env {
  public static readonly NODE_ENV = process.env.NODE_ENV;
  public static readonly CONNECTION_STRING = process.env.CONNECTION_STRING;
  public static readonly COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;
  public static readonly JWT_SECRET = process.env.JWT_SECRET || "";
  public static readonly JWT_ISS = process.env.JWT_ISS;
  public static readonly JWT_AUD = _.split(process.env.JWT_AUD, ";");
  public static readonly JWT_VALID_ISS = _.split(
    process.env.JWT_VALID_ISS,
    ";"
  );
  public static readonly JWT_VALID_AUD = _.split(
    process.env.JWT_VALID_AUD,
    ";"
  );
  public static readonly GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
  public static readonly GOOGLE_CLIENT_SECRET =
    process.env.GOOGLE_CLIENT_SECRET || "";
}
