import url from 'url';
import axios from 'axios';

const absoluteUrl = (req, setLocalhost) => {
  let protocol = 'https',
    host = req ? req.headers.host : window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = 'http';
  }
  return url.format({
    protocol,
    host,
    pathname: '/' // req.url
  });
};

export default (options, req) => {
  const baseUrl = absoluteUrl(req, 'localhost:3000');
  options.url =
    process.env.NODE_ENV === 'production'
      ? baseUrl + options.url
      : `http://localhost:9999/${options.url}`;
  return axios(options);
};
