'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const currentPageRef = useRef(1)
  const totalPagesRef = useRef(1)
  const searchTimeoutRef = useRef(null)

  function toggleMobile() {
    const nav = document.getElementById('mobile-nav')
    const icon = document.getElementById('menu-icon')
    if (nav && icon) {
      nav.classList.toggle('open')
      icon.classList.toggle('ph-list')
      icon.classList.toggle('ph-x')
    }
  }

  function renderPagination() {
    const nav = document.getElementById('pagination-nav')
    if (!nav) return
    const ul = nav.querySelector('ul')
    if (!ul) return
    const totalPages = totalPagesRef.current
    const currentPage = currentPageRef.current
    if (totalPages <= 1) { nav.classList.add('hidden'); return; }
    nav.classList.remove('hidden')

    let html = ''
    const btnClass = 'flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all'
    const activeClass = 'bg-violet-500/20 text-violet-400'
    const inactiveClass = 'text-gray-500 hover:text-white hover:bg-gray-800/50'

    html += `<li><button data-page="${currentPage - 1}" class="${btnClass} ${inactiveClass} ${currentPage <= 1 ? 'opacity-30 cursor-not-allowed' : ''}" ${currentPage <= 1 ? 'disabled' : ''}><i class="ph-duotone ph-caret-left"></i></button></li>`

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        html += `<li><button data-page="${i}" class="${btnClass} ${i === currentPage ? activeClass : inactiveClass}">${i}</button></li>`
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        html += `<li><span class="flex items-center justify-center w-9 h-9 text-gray-600 text-sm">...</span></li>`
      }
    }

    html += `<li><button data-page="${currentPage + 1}" class="${btnClass} ${inactiveClass} ${currentPage >= totalPages ? 'opacity-30 cursor-not-allowed' : ''}" ${currentPage >= totalPages ? 'disabled' : ''}><i class="ph-duotone ph-caret-right"></i></button></li>`

    ul.innerHTML = html

    ul.querySelectorAll('button[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page)
        if (page && page !== currentPageRef.current && !btn.disabled) {
          currentPageRef.current = page
          fetchProducts()
          window.scrollTo({ top: 400, behavior: 'smooth' })
        }
      })
    })
  }

  async function fetchProducts() {
    const searchInput = document.getElementById('search-input')
    const limitSelect = document.getElementById('limit-select')
    const search = searchInput ? searchInput.value : ''
    const limit = limitSelect ? limitSelect.value : '12'
    const page = currentPageRef.current
    const params = { page, limit }
    if (search) params.search = search

    const grid = document.getElementById('products-grid')
    const paginationNav = document.getElementById('pagination-nav')
    const resultCount = document.getElementById('result-count')
    if (!grid) return

    try {
      const res = await fetch(`/api/products?${new URLSearchParams(params)}`)
      const data = await res.json()

      if (!data.data || data.data.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full">
            <div class="flex flex-col items-center justify-center py-20 text-center">
              <i class="ph-duotone ph-box text-6xl text-gray-700 mb-4"></i>
              <h3 class="text-lg font-semibold text-gray-400 mb-1" data-i18n="section.empty_title">No keymaps found</h3>
              <p class="text-gray-600 text-sm mb-6" data-i18n="section.empty_desc">Be the first to share a keymap!</p>
              <a href="/upload" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold hover:from-violet-400 hover:to-purple-500 transition-all">
                <i class="ph-duotone ph-plus-circle"></i>
                <span data-i18n="section.empty_btn">Upload Now</span>
              </a>
            </div>
          </div>`
        paginationNav?.classList.add('hidden')
        if (resultCount) resultCount.textContent = '0 ' + t('section.results')
        return
      }

      grid.innerHTML = data.data.map(item => renderProductCard(item)).join('')
      const r = data.pagination.total
      if (resultCount) resultCount.textContent = `${r} ${r !== 1 ? t('section.results') : t('section.result')}`
      totalPagesRef.current = data.pagination.pages || 1
      renderPagination()
      translatePage()
    } catch (err) {
      grid.innerHTML = `<div class="col-span-full"><div class="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><i class="ph-duotone ph-warning text-lg"></i> ${t('section.error')}</div></div>`
    }
  }

  useEffect(() => {
    const searchInput = document.getElementById('search-input')
    const limitSelect = document.getElementById('limit-select')

    const handleSearchInput = () => {
      clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = setTimeout(() => {
        currentPageRef.current = 1
        fetchProducts()
      }, 300)
    }

    const handleLimitChange = () => {
      currentPageRef.current = 1
      fetchProducts()
    }

    const handleLangChange = () => {
      fetchProducts()
    }

    if (searchInput) searchInput.addEventListener('input', handleSearchInput)
    if (limitSelect) limitSelect.addEventListener('change', handleLimitChange)
    document.addEventListener('langchange', handleLangChange)

    fetchProducts()

    return () => {
      if (searchInput) searchInput.removeEventListener('input', handleSearchInput)
      if (limitSelect) limitSelect.removeEventListener('change', handleLimitChange)
      document.removeEventListener('langchange', handleLangChange)
      clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 nav-blur border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <img src="/mars_128x.png" alt="KeymapHub" className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-violet-500/20" />
              <span className="text-lg font-bold text-white tracking-tight">KeymapHub</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
                <i className="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
              </Link>
              <Link href="/docs" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
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

              <Link href="/upload" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-400 hover:to-purple-500 transition-all duration-200">
                <i className="ph-duotone ph-plus-circle"></i>
                <span data-i18n="nav.upload">Upload</span>
              </Link>

              <button onClick={toggleMobile} className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-list text-xl" id="menu-icon"></i>
              </button>
            </div>
          </div>

          <div id="mobile-nav" className="mobile-nav md:hidden">
            <div className="py-3 space-y-1 border-t border-gray-800/50">
              <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
                <i className="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
              </Link>
              <Link href="/docs" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold sm:hidden">
                <i className="ph-duotone ph-plus-circle"></i> <span data-i18n="nav.upload">Upload</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[420px] sm:min-h-[500px] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 hero-glow"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
              <i className="ph-duotone ph-database"></i>
              <span data-i18n="hero.badge">Keymap Sharing for Martian Launcher</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
              <span data-i18n="hero.title1">Discover & Share</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400" data-i18n="hero.title2">Keymap Layouts</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl" data-i18n="hero.desc">
              Share your custom touch control layouts for Martian Launcher. Browse community-created keymaps for Minecraft: Java Edition on Android.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link href="/upload" className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-400 hover:to-purple-500 transition-all duration-200 w-full sm:w-auto justify-center">
                <i className="ph-duotone ph-upload text-lg"></i>
                <span data-i18n="hero.btn_upload">Share Your Keymap</span>
              </Link>
              <Link href="/docs" className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 font-medium hover:bg-gray-800 hover:border-gray-600 transition-all w-full sm:w-auto justify-center">
                <i className="ph-duotone ph-code text-lg"></i>
                <span data-i18n="hero.btn_docs">API Docs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white" data-i18n="section.title">Explore Keymaps</h2>
            <p className="text-gray-500 text-sm mt-1" id="result-count">Loading...</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <i className="ph-duotone ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
              <input type="text" id="search-input" data-i18n-placeholder="section.search" placeholder="Search keymaps..." defaultValue="" className="w-full sm:w-56 pl-9 pr-3 py-2 bg-gray-900/50 border border-gray-800 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all" />
            </div>
            <select id="limit-select" defaultValue="12" className="px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-xl text-sm text-gray-400 focus:outline-none focus:border-violet-500/50 cursor-pointer shrink-0">
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
            </select>
          </div>
        </div>

        <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div className="col-span-full flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-gray-500">
              <i className="ph-duotone ph-circle-notch text-2xl animate-spin"></i>
              <span className="text-sm" data-i18n="section.loading">Loading keymaps...</span>
            </div>
          </div>
        </div>

        <nav id="pagination-nav" className="mt-10 hidden">
          <ul className="flex items-center justify-center gap-1.5"></ul>
        </nav>
      </main>

      <footer className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm" data-i18n="footer.text">KeymapHub — Community Keymap Sharing for Martian Launcher</p>
            <div className="flex items-center gap-4">
              <Link href="/docs" className="text-gray-500 hover:text-gray-300 text-sm transition-colors" data-i18n="nav.api">API</Link>
              <Link href="/upload" className="text-gray-500 hover:text-gray-300 text-sm transition-colors" data-i18n="nav.upload">Upload</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
