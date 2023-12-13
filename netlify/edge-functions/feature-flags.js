export default async function handler(request, context) {
  const response = await context.next();
  const headers = response.headers;
  const country = context.geo.country.code;
  if (headers.get('content-type').includes('text/html')) {
    const content = await response.text();
    const updatedContent = content.replace('<body', `<body data-nf-geo="${country}"`);
    return new Response(updatedContent, response);
  }
  return response;
}

export const config = {
  path: "*",
};