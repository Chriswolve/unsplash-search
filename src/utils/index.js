
export const encodeURI = (value)=> value.replaceAll(' ', '-');

export const decodeURI = (value)=> value.replaceAll('-', ' ');

export default {
  encodeURI,
  decodeURI
}
