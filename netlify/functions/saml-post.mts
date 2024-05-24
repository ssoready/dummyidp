import type { Config, Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
    const formData = await req.formData()

    let query = ""
    formData.forEach((value, key) => {
        query += encodeURIComponent(key) + "=" + encodeURIComponent(value.toString())
    })

    return new Response(null, {
        status: 303,
        headers: {
            location: `/apps/${context.params.appId}/sso?${query}`,
        }
    })
}

export const config: Config = {
    path: "/saml-post/:appId"
};
