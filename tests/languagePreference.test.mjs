import test from 'node:test'
import assert from 'node:assert/strict'
import {resolveLanguage,languageURL} from '../src/languagePreference.ts'
test('explicit language overrides saved preference, with safe defaults',()=>{
 assert.equal(resolveLanguage('?lang=es','EN'),'ES')
 assert.equal(resolveLanguage('?lang=EN','ES'),'EN')
 assert.equal(resolveLanguage('?lang=invalid','ES'),'ES')
 assert.equal(resolveLanguage('',null),'EN')
})
test('shareable language URL preserves dashboard route and unrelated query parameters',()=>{
 const url=languageURL('https://example.org/?x=1#/projects/corporate-bi-platform?cts','ES')
 assert.equal(url,'https://example.org/?x=1&lang=es#/projects/corporate-bi-platform?cts')
 assert.equal(languageURL(url,'EN'),'https://example.org/?x=1&lang=en#/projects/corporate-bi-platform?cts')
})
