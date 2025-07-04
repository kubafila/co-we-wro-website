import emojiRegex from 'emoji-regex';
export function removeEmoji (text:string):string {
  const regex = emojiRegex();
  return  text.replace(regex, '');
}