import { $fetch } from "ofetch";

export default defineCachedEventHandler(
  async (event) => {
    setResponseHeader(event, "Cache-Control", "no-store");
    const query = getQuery(event);
    const username = String(query.user || "octocat");

    try {
      const data = await $fetch(
        `https://api.github.com/users/${username}/repos`
      );
      return {
        data,
      };
    } catch (error) {
      console.error("GitHub API error:", error);
      return sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: "GitHub fetch failed",
        })
      );
    }
  },
  {
    swr: true,
    maxAge: 60,
  }
);
