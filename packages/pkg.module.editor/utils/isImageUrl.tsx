const isImageUrl = (url: string) => /^https?:\/\/.*\.(jpeg|jpg|gif|png)$/.test(url);

export default isImageUrl;
