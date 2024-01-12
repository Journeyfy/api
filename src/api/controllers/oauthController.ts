import axios, { AxiosResponse } from "axios";
import { FastifyInstance } from "fastify";
import { UserDbo } from "../../models/dbo/user.dbo";
import { v4 } from "uuid";
import dayjs from "dayjs";

const oauthController = async (fastify: FastifyInstance) => {
  fastify.get("/oauth/google/callback", async function (req, rep) {
    const { token } =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

    /**
     * email,
     * given_name
     * family_name
     * picture (url)
     */
    const { data: gUserInfo } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: "Bearer " + token.access_token,
          "Content-Type": "application/json",
        },
      }
    );

    async function getUserByMailAsync(mail: string) {
      return fastify.mysql.execute<UserDbo[]>(
        "SELECT * FROM user WHERE email = ?",
        [mail]
      );
    }

    let [[user]] = await getUserByMailAsync(gUserInfo.email);
    if (user != null) {
      // TODO
      // return JWT & User
    } else {
      const statement =
        "INSERT INTO `user`(`idUser`, `firstName`, `lastName`, `email`, `password`, `idRole`, `picture`, `registeredOnUtc`) VALUES (?,?,?,?,?,?,?,?)";
      await fastify.mysql.execute(statement, [
        v4(),
        gUserInfo.given_name,
        gUserInfo.family_name,
        gUserInfo.email,
        null,
        3,
        gUserInfo.picture,
        dayjs.utc().format(),
      ]);

      // return [[await getUserByMailAsync(gUserInfo.email)]];
      // TODO
      // return JWT & User
    }
  });
};

export default oauthController;
