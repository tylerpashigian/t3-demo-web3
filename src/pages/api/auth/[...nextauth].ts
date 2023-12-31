import NextAuth from "next-auth";
import { type NextApiRequest, type NextApiResponse } from "next";
import { authOptions } from "~/server/auth";

const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("In [...nextauth].ts");

  const authOps = authOptions({ req });

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send("Bad request");
    return;
  }

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth?.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    // Removes from the authOptions.providers array
    authOps.providers.pop();
  }

  // Could this return be causing the issue? When trying to create a var here, I get this error:
  // "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await NextAuth(req, res, authOps);
};

export default Auth;
