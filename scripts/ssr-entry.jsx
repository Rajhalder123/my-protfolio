// Server entry used only at build time by scripts/prerender.mjs.
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Writable } from 'node:stream';
import { AppShell } from '../src/App';
import projects from '../src/data/projects.json';
import profile from '../src/data/profile.json';

export { projects, profile };

/** Renders one URL to an HTML string, waiting for lazy routes to resolve. */
export function render(url) {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk.toString();
        done();
      },
    });
    sink.on('finish', () => resolve(html));

    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(sink);
        },
        onShellError: reject,
        onError: reject,
      }
    );
  });
}
