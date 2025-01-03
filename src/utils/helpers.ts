export const getURL = (path: string) => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : 'http://localhost:3000/'

  url = url.replace(/\/+$/, '')
  url = url.includes('http') ? url : `https://${url}`
  const sanitazePath = path.replace(/^\/+/, '')

  return sanitazePath ? `${url}/${sanitazePath}` : url
}
