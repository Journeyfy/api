import axios from "axios";
import { FastifyInstance } from "fastify";

const oAuthController = async (fastify: FastifyInstance) => {
  const userRepository = fastify.diContainer.cradle.userRepository;
  const userService = fastify.diContainer.cradle.userService;

  fastify.get("/oauth/google/callback", async function (req, rep) {
    const { token } =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

    /**
     * Campi da prendere da api google
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

    const user = await userService.getUserByEmailAsync(gUserInfo.email);
    if (user != null) {
      const payload = {
        id: user.idUser,
        email: user.email,
        role: user.role,
      };

      const token = await rep.jwtSign(payload);
      return rep
        .setCookie("access_token", token, {
          domain: "localhost",
          path: "/api",
          secure: true, // send cookie over HTTPS only
          httpOnly: true,
          sameSite: true, // alternative CSRF protection
          maxAge: 604800, // 7d
        })
        .send();
    } else {
      const newUser = await userService.createUserAsync(
        gUserInfo.given_name,
        gUserInfo.family_name,
        gUserInfo.email,
        null,
        3,
        gUserInfo.picture
      );
      const payload = {
        id: newUser!.idUser,
        email: newUser!.email,
        role: newUser!.role,
      };

      const token = await rep.jwtSign(payload);
      return rep
        .setCookie("access_token", token, {
          domain: "localhost",
          path: "/api",
          secure: true, // send cookie over HTTPS only
          httpOnly: true,
          sameSite: true, // alternative CSRF protection
          maxAge: 604800, // 7d
        })
        .send();
    }
  });
};

export default oAuthController;
