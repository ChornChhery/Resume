import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const css = readFileSync(path.join(projectRoot, 'style.css'), 'utf8');
const appPath = path.join(projectRoot, 'app.js');
const app = existsSync(appPath) ? readFileSync(appPath, 'utf8') : '';

function tags(source, name) {
  return [...source.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(([tag]) => tag);
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
}

function localTargetExists(reference) {
  if (!reference || reference.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) return true;
  const pathname = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  if (!pathname) return true;
  return existsSync(path.resolve(projectRoot, pathname.replace(/^[/\\]+/, '')));
}

const requiredSections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
const anchors = tags(html, 'a');
const hrefs = anchors.map((tag) => attribute(tag, 'href')).filter(Boolean);
const localReferences = [
  ...anchors.map((tag) => attribute(tag, 'href')),
  ...tags(html, 'img').map((tag) => attribute(tag, 'src')),
  ...tags(html, 'script').map((tag) => attribute(tag, 'src')),
  ...tags(html, 'link').map((tag) => attribute(tag, 'href')),
].filter(Boolean);

for (const sectionId of requiredSections) {
  test(`the portfolio provides the ${sectionId} destination`, () => {
    assert.ok(new RegExp(`<section\\b(?=[^>]*\\bid=["']${sectionId}["'])`, 'i').test(html), `missing section #${sectionId}`);
  });
}

test('the page has one primary heading and semantic main and footer landmarks', () => {
  assert.equal(tags(html, 'h1').length, 1, 'exactly one h1 should identify the page');
  assert.equal(tags(html, 'main').length, 1, 'the portfolio should have one main landmark');
  assert.equal(tags(html, 'footer').length, 1, 'the page should close with one footer landmark');
});

test('primary navigation links to all required sections and has an accessible name', () => {
  const navTag = tags(html, 'nav').find((tag) => attribute(tag, 'aria-label'));
  const navMarkup = html.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/i)?.[0] ?? '';
  assert.ok(navTag, 'a navigation landmark should expose an accessible name');
  for (const sectionId of requiredSections) {
    assert.ok(hrefs.includes(`#${sectionId}`), `navigation should link to #${sectionId}`);
    assert.ok(new RegExp(`href=["']#${sectionId}["']`, 'i').test(navMarkup), `#${sectionId} must be in the primary navigation`);
  }
});

test('all local links and media resources resolve inside the project', () => {
  const broken = localReferences.filter((reference) => !localTargetExists(reference));
  assert.deepEqual(broken, [], `unresolved local references: ${broken.join(', ')}`);
});

test('new-tab links prevent opener access', () => {
  const unsafe = anchors.filter((tag) => {
    if (attribute(tag, 'target')?.toLowerCase() !== '_blank') return false;
    const rel = new Set((attribute(tag, 'rel') ?? '').toLowerCase().split(/\s+/));
    return !rel.has('noopener') || !rel.has('noreferrer');
  }).map((tag) => attribute(tag, 'href'));
  assert.equal(unsafe.length, 0, `${unsafe.length} new-tab links need safe rel values; first: ${unsafe.slice(0, 6).join(', ')}`);
});

test('resume, transcript, email, and verified social profiles remain directly reachable', () => {
  assert.ok(anchors.some((tag) => attribute(tag, 'href') === 'ChornChhery_Resume.pdf' && attribute(tag, 'download') !== null), 'full resume should have a direct download');
  assert.ok(anchors.some((tag) => attribute(tag, 'href') === 'ChornChhery_Resume_1page.pdf' && attribute(tag, 'download') !== null), 'one-page resume should have a direct download');
  assert.ok(hrefs.includes('transcript.pdf'), 'transcript PDF should remain linked');
  for (const href of ['mailto:chherychorn@gmail.com', 'https://github.com/ChornChhery', 'https://www.linkedin.com/in/chhery-chorn/', 'https://t.me/chornchhery']) {
    assert.ok(hrefs.includes(href), `verified contact/profile link missing: ${href}`);
  }
});

test('contact is honest and does not expose a nonfunctional form', () => {
  assert.doesNotMatch(html, /<form\b/i, 'do not present a form without a real submission service');
  assert.ok(hrefs.includes('mailto:chherychorn@gmail.com'), 'direct email contact should be available');
});

test('project imagery has alternative text and local images are present', () => {
  const images = tags(html, 'img').filter((tag) => attribute(tag, 'src')?.trim());
  assert.ok(images.length >= 2, 'the portfolio should use the real portrait and project evidence');
  for (const image of images) {
    assert.ok(attribute(image, 'alt')?.trim(), `image needs alternative text: ${attribute(image, 'src')}`);
  }
});

test('the site does not depend on external runtime scripts or imported web fonts', () => {
  const remoteScripts = tags(html, 'script').filter((tag) => /^(?:https?:)?\/\//i.test(attribute(tag, 'src') ?? '')).map((tag) => attribute(tag, 'src'));
  assert.deepEqual(remoteScripts, [], `runtime scripts should not need a CDN: ${remoteScripts.join(', ')}`);
  assert.ok(!/@import\s+url\s*\(\s*["']?https?:/i.test(css), 'typography should not require a remote font import');
});

test('mobile navigation uses a real button with an expanded state and controlled navigation', () => {
  const controls = tags(html, 'button').filter((tag) => attribute(tag, 'aria-controls'));
  assert.ok(controls.some((tag) => attribute(tag, 'aria-expanded') === 'false'), 'menu button should expose its initial collapsed state');
  assert.ok(controls.some((button) => tags(html, 'nav').some((nav) => attribute(nav, 'id') === attribute(button, 'aria-controls'))), 'menu button should control a navigation landmark');
});

test('responsive layouts and reduced-motion preferences are explicitly supported', () => {
  assert.ok(/@media\s*\([^)]*max-width/i.test(css), 'small screens need responsive layout rules');
  assert.ok(/@media\s*\([^)]*prefers-reduced-motion\s*:\s*reduce/i.test(css), 'motion preferences should be respected');
  assert.ok(/prefers-reduced-motion\s*:\s*reduce[\s\S]*?scroll-behavior\s*:\s*auto/i.test(css), 'reduced motion should disable smooth scrolling');
});

test('the chapter rail provides section links and announces the current location', () => {
  assert.ok(/aria-label=["'][^"']*(?:chapter|section|revision)[^"']*["']/i.test(html), 'the signature chapter rail should be named for assistive technology');
  assert.ok(/aria-current/.test(app), 'the active chapter should be exposed to assistive technology');
});

test('project details and image viewing use keyboard-operable native controls', () => {
  assert.ok(tags(html, 'details').length > 0, 'technical details should use native disclosures');
  assert.ok(tags(html, 'dialog').length > 0, 'image viewing should use a native dialog');
  assert.ok(tags(html, 'button').some((tag) => attribute(tag, 'aria-label')?.toLowerCase().includes('close')), 'the image dialog should have a labeled close button');
});
