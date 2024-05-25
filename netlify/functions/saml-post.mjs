console.log("test1")
export default async (req, context) => {
    console.log("test2")
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

export const config = {
    path: "/saml-post/:appId"
};
