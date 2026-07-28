export async function GET(request: Request) {
    const url = new URL(request.url);

    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");

    const redirectUri = "14expoauthentication://";

    const params = new URLSearchParams({
        code: code || "",
        state: state || "",
    })

    return Response.redirect(`${redirectUri}?${params.toString()}`)
}