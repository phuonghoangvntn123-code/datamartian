'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DocsPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const baseUrl = window.location.origin + '/api'
    const displayEl = document.getElementById('base-url-display')
    if (displayEl) displayEl.textContent = baseUrl
    document.querySelectorAll('[id^="ex-"]').forEach(el => {
      el.textContent = baseUrl + el.textContent
    })
  }, [])

  const toggleMobile = () => setMobileOpen(prev => !prev)

  const handleSelectChange = (e) => {
    location.hash = e.target.value
  }

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 nav-blur border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <img src="/mars_128x.png" alt="KeymapHub" className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-violet-500/20" />
              <span className="text-lg font-bold text-white tracking-tight">KeymapHub</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
              </Link>
              <Link href="/docs" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
                <i className="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setLang('vi')} className="lang-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium bg-violet-500/20 text-white hover:bg-violet-500/30 transition-all" data-lang="vi">
                <span>🇻🇳</span>
              </button>
              <button onClick={() => setLang('en')} className="lang-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-800/50 transition-all" data-lang="en">
                <span>🇺🇸</span>
              </button>

              <button onClick={toggleMobile} className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className={`ph-duotone text-xl ${mobileOpen ? 'ph-x' : 'ph-list'}`} id="menu-icon"></i>
              </button>
            </div>
          </div>

          <div id="mobile-nav" className={`mobile-nav md:hidden ${mobileOpen ? 'open' : ''}`}>
            <div className="py-3 space-y-1 border-t border-gray-800/50">
              <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
              </Link>
              <Link href="/docs" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
                <i className="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 mb-4">
              <i className="ph-duotone ph-code text-xl sm:text-2xl text-violet-400"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white" data-i18n="docs.title">API Documentation</h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-lg mx-auto" data-i18n="docs.desc">RESTful API for managing keymap layouts. All responses are JSON.</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-800 text-sm text-gray-400 mt-4">
              <i className="ph-duotone ph-link text-violet-400"></i>
              <span data-i18n="docs.base_url">Base URL</span>: <code className="text-violet-400 font-mono" id="base-url-display">/api</code>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <nav className="lg:sticky lg:top-24 space-y-1 hidden lg:block">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" data-i18n="docs.endpoints">Endpoints</div>
                <a href="#list" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0"></span>
                  GET /products
                </a>
                <a href="#get" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  GET /products/{'{id}'}
                </a>
                <a href="#create" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                  POST /products
                </a>
                <a href="#update" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                  PUT /products/{'{id}'}
                </a>
                <a href="#upload" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0"></span>
                  POST /upload
                </a>
              </nav>

              <select onChange={handleSelectChange} className="lg:hidden w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-sm text-gray-400 focus:outline-none focus:border-violet-500/50">
                <option value="#list">GET /products</option>
                <option value="#get">GET /products/{'{id}'}</option>
                <option value="#create">POST /products</option>
                <option value="#update">PUT /products/{'{id}'}</option>
                <option value="#upload">POST /upload</option>
              </select>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div id="list" className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-wider">GET</span>
                  <code className="text-white font-mono text-base sm:text-lg">/api/products</code>
                </div>
                <p className="text-gray-400 text-sm mb-4">List all keymaps with pagination and search.</p>

                <h4 className="text-sm font-semibold text-white mb-3">Query Parameters</h4>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800/50">
                        <th className="text-left py-2 px-4 sm:px-0 sm:pr-4 font-medium">Param</th>
                        <th className="text-left py-2 pr-4 font-medium">Type</th>
                        <th className="text-left py-2 pr-4 font-medium hidden sm:table-cell">Default</th>
                        <th className="text-left py-2 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-gray-800/30">
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">page</td>
                        <td className="py-2.5 pr-4">int</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">1</td>
                        <td className="py-2.5">Page number</td>
                      </tr>
                      <tr className="border-b border-gray-800/30">
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">limit</td>
                        <td className="py-2.5 pr-4">int</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">12</td>
                        <td className="py-2.5">Items per page</td>
                      </tr>
                      <tr className="border-b border-gray-800/30">
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">search</td>
                        <td className="py-2.5 pr-4">string</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">-</td>
                        <td className="py-2.5">Search by keymap name</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">author</td>
                        <td className="py-2.5 pr-4">string</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">-</td>
                        <td className="py-2.5">Filter by author</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-sm font-semibold text-white mt-5 mb-3">Response</h4>
                <pre className="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto whitespace-pre-wrap break-all">{`{
  "data": [{ "id": 1, "name": "Two Finger Tap", "version": "1.0.0" }],
  "pagination": { "page": 1, "limit": 12, "total": 50, "pages": 5 }
}`}</pre>

                <h4 className="text-sm font-semibold text-white mt-5 mb-3">Example</h4>
                <pre className="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl <span className="text-violet-400" id="ex-list">/api/products?page=1&limit=10&search=vietnam</span></pre>
              </div>

              <div id="get" className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">GET</span>
                  <code className="text-white font-mono text-base sm:text-lg">/api/products/{'{id}'}</code>
                </div>
                <p className="text-gray-400 text-sm mb-4">Get a single keymap by ID.</p>

                <h4 className="text-sm font-semibold text-white mb-3">Response</h4>
                <pre className="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">{`{
  "id": 1,
  "name": "Two Finger Tap",
  "version": "1.0.0",
  "author": "Player123",
  "json_data": "{\\"version\\":1,\\"controls\\":[...]}"
}`}</pre>

                <h4 className="text-sm font-semibold text-white mt-5 mb-3">Example</h4>
                <pre className="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl <span className="text-violet-400" id="ex-get">/api/products/1</span></pre>
              </div>

              <div id="create" className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">POST</span>
                  <code className="text-white font-mono text-base sm:text-lg">/api/products</code>
                </div>
                <p className="text-gray-400 text-sm mb-4">Create a new keymap. Supports <code className="text-violet-400">multipart/form-data</code>.</p>

                <h4 className="text-sm font-semibold text-white mb-3">Fields</h4>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800/50">
                        <th className="text-left py-2 px-4 sm:px-0 sm:pr-4 font-medium">Field</th>
                        <th className="text-left py-2 pr-4 font-medium hidden sm:table-cell">Type</th>
                        <th className="text-left py-2 font-medium">Required</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-gray-800/30">
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">name</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">string</td>
                        <td className="py-2.5"><span className="text-red-400">Yes</span></td>
                      </tr>
                      <tr className="border-b border-gray-800/30">
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">version</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">string</td>
                        <td className="py-2.5">No</td>
                      </tr>
                      <tr className="border-b border-gray-800/30">
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">json_file</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">file</td>
                        <td className="py-2.5">No</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">image</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">file</td>
                        <td className="py-2.5">No</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-sm font-semibold text-white mt-5 mb-3">Example (cURL)</h4>
                <pre className="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl -X POST <span className="text-violet-400" id="ex-create">/api/products</span> \
  -F &quot;name=Two Finger Tap&quot; \
  -F &quot;version=1.0.0&quot; \
  -F &quot;image=@screenshot.jpg&quot;</pre>
              </div>

              <div id="update" className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">PUT</span>
                  <code className="text-white font-mono text-base sm:text-lg">/api/products/{'{id}'}</code>
                </div>
                <p className="text-gray-400 text-sm mb-4">Update an existing keymap.</p>
                <h4 className="text-sm font-semibold text-white mb-3">Example</h4>
                <pre className="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl -X PUT <span className="text-violet-400" id="ex-update">/api/products/1</span> \
  -F &quot;name=Updated Name&quot;</pre>
              </div>

              <div id="upload" className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">POST</span>
                  <code className="text-white font-mono text-base sm:text-lg">/api/upload</code>
                </div>
                <p className="text-gray-400 text-sm mb-4">Upload a file (JSON keymap or preview image) to Vercel Blob. Returns a public URL.</p>

                <h4 className="text-sm font-semibold text-white mb-3">Fields</h4>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800/50">
                        <th className="text-left py-2 px-4 sm:px-0 sm:pr-4 font-medium">Field</th>
                        <th className="text-left py-2 pr-4 font-medium hidden sm:table-cell">Type</th>
                        <th className="text-left py-2 font-medium">Required</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-gray-800/30">
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">file</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">file</td>
                        <td className="py-2.5"><span className="text-red-400">Yes</span></td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">type</td>
                        <td className="py-2.5 pr-4 hidden sm:table-cell">string</td>
                        <td className="py-2.5">No (<code className="text-gray-500">json</code> or <code className="text-gray-500">image</code>, default: <code className="text-gray-500">json</code>)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-sm font-semibold text-white mt-5 mb-3">Response</h4>
                <pre className="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">{`{
  "url": "https://xxxx.blob.vercel-storage.com/...",
  "pathname": "keymaphub/json/abc123.json",
  "type": "json",
  "size": 1234
}`}</pre>

                <h4 className="text-sm font-semibold text-white mt-5 mb-3">Example (cURL)</h4>
                <pre className="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl -X POST <span className="text-violet-400" id="ex-upload">/api/upload</span> \
  -F &quot;file=@keymap.json&quot; \
  -F &quot;type=json&quot;

$ curl -X POST <span className="text-violet-400">/api/upload</span> \
  -F &quot;file=@screenshot.png&quot; \
  -F &quot;type=image&quot;</pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm" data-i18n="footer.text">KeymapHub — Community Keymap Sharing for Martian Launcher</p>
        </div>
      </footer>
    </>
  )
}
