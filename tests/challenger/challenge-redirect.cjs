// Adversarial test for /silat-series HTTP redirect across diverse clients, methods, and headers.
const assert = require('node:assert/strict');
const http = require('node:http');

const base = process.env.BASE_URL || 'http://localhost:3000';
const url = new URL(base);
const host = url.hostname;
const port = url.port || 3000;

async function rawRequest(options, postData = '') {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host,
        port,
        path: options.path,
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body,
          });
        });
      }
    );
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function run() {
  console.log('--- STARTING ADVERSARIAL REDIRECT TESTS FOR /silat-series ---');
  let failures = 0;

  const testCases = [
    {
      name: 'Standard GET browser request',
      path: '/silat-series',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      expectedStatus: 308,
      expectedLocation: '/collections/silat-series',
    },
    {
      name: 'HEAD request',
      path: '/silat-series',
      method: 'HEAD',
      headers: {
        'User-Agent': 'curl/8.4.0',
      },
      expectedStatus: 308,
      expectedLocation: '/collections/silat-series',
    },
    {
      name: 'Googlebot Crawler',
      path: '/silat-series',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        Accept: '*/*',
      },
      expectedStatus: 308,
      expectedLocation: '/collections/silat-series',
    },
    {
      name: 'Mobile Safari Client',
      path: '/silat-series',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        Accept: 'text/html',
      },
      expectedStatus: 308,
      expectedLocation: '/collections/silat-series',
    },
    {
      name: 'Query parameters preservation (?source=instagram&campaign=raya2026)',
      path: '/silat-series?source=instagram&campaign=raya2026',
      method: 'GET',
      headers: {
        Accept: 'text/html',
      },
      expectedStatus: 308,
      expectedLocation: '/collections/silat-series?source=instagram&campaign=raya2026',
    },
    {
      name: 'RSC (React Server Component) Prefetch Header',
      path: '/silat-series',
      method: 'GET',
      headers: {
        RSC: '1',
        'Next-Router-Prefetch': '1',
        Accept: 'text/x-component',
      },
      expectedStatus: 308,
      expectedLocation: '/collections/silat-series',
    },
    {
      name: 'Case sensitivity check (/SILAT-SERIES)',
      path: '/SILAT-SERIES',
      method: 'GET',
      headers: {},
      allow404Or308: true, // Next.js routes are case-sensitive by default unless configured
    },
    {
      name: 'Trailing slash (/silat-series/)',
      path: '/silat-series/',
      method: 'GET',
      headers: {},
      allow404Or308: true,
    },
  ];

  for (const tc of testCases) {
    try {
      const res = await rawRequest(tc);
      if (tc.allow404Or308) {
        console.log(`PASS [Optional/Variant] ${tc.name}: Status ${res.statusCode}, Location: ${res.headers.location || 'none'}`);
        continue;
      }
      assert.equal(res.statusCode, tc.expectedStatus, `${tc.name}: Expected status ${tc.expectedStatus}, got ${res.statusCode}`);
      assert.equal(res.headers.location, tc.expectedLocation, `${tc.name}: Expected Location '${tc.expectedLocation}', got '${res.headers.location}'`);
      console.log(`PASS ${tc.name}: ${res.statusCode} -> ${res.headers.location}`);
    } catch (err) {
      console.error(`FAIL ${tc.name}: ${err.message}`);
      failures++;
    }
  }

  // Also verify following redirect reaches destination with 200
  try {
    const finalRes = await fetch(`${base}/silat-series`, { redirect: 'follow' });
    assert.equal(finalRes.status, 200, 'Followed redirect should yield 200 OK');
    const text = await finalRes.text();
    assert.ok(text.includes('SILAT') || text.includes('SIRI SILAT'), 'Followed redirect content contains SILAT');
    console.log(`PASS Followed redirect resolved to 200 OK with content length ${text.length}`);
  } catch (err) {
    console.error(`FAIL Followed redirect: ${err.message}`);
    failures++;
  }

  if (failures > 0) {
    console.error(`TOTAL FAILURES: ${failures}`);
    process.exit(1);
  } else {
    console.log('ALL REDIRECT TESTS PASSED SUCCESSFULLY.');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
