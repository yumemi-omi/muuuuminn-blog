import type { NextApiHandler } from "next";

const githubHandler: NextApiHandler = async (req, res) => {
  const { body, method } = req;

  switch (method) {
    case "POST": {
      const response = await fetch(process.env.GITHUB_API_ENDPOINT || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
        body,
      });

      const json = await response.json();

      res.status(200).json(json);
      break;
    }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default githubHandler;
