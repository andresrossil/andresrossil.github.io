export type Language='ES'|'EN'
export function resolveLanguage(search:string,saved:string|null):Language{
 const explicit=new URLSearchParams(search).get('lang')?.toUpperCase()
 if(explicit==='ES'||explicit==='EN')return explicit
 return saved==='ES'||saved==='EN'?saved:'EN'
}
export function languageURL(href:string,language:Language){const url=new URL(href);url.searchParams.set('lang',language.toLowerCase());return url.toString()}
