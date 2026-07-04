'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function UploadPage() {
  const formRef = useRef(null)

  const toggleMobile = () => {
    const nav = document.getElementById('mobile-nav')
    const icon = document.getElementById('menu-icon')
    nav.classList.toggle('open')
    icon.classList.toggle('ph-list')
    icon.classList.toggle('ph-x')
  }

  useEffect(() => {
    const cleanups = []

    ;['json', 'image'].forEach(type => {
      const dropzone = document.getElementById(`${type}-dropzone`)
      const input = dropzone.querySelector('input')
      const info = document.getElementById(`${type}-file-info`)

      const onClick = () => input.click()
      const onDragOver = e => {
        e.preventDefault()
        dropzone.classList.add('active')
      }
      const onDragLeave = () => dropzone.classList.remove('active')
      const onDrop = e => {
        e.preventDefault()
        dropzone.classList.remove('active')
        if (e.dataTransfer.files.length) {
          input.files = e.dataTransfer.files
          input.dispatchEvent(new Event('change'))
        }
      }
      const onChange = () => {
        if (input.files.length) {
          const f = input.files[0]
          info.innerHTML = `<i class="ph-duotone ph-check-circle"></i> ${f.name} (${(f.size / 1024).toFixed(1)} KB)`
          info.classList.remove('hidden')
        } else {
          info.classList.add('hidden')
        }
      }

      dropzone.addEventListener('click', onClick)
      dropzone.addEventListener('dragover', onDragOver)
      dropzone.addEventListener('dragleave', onDragLeave)
      dropzone.addEventListener('drop', onDrop)
      input.addEventListener('change', onChange)

      cleanups.push(() => {
        dropzone.removeEventListener('click', onClick)
        dropzone.removeEventListener('dragover', onDragOver)
        dropzone.removeEventListener('dragleave', onDragLeave)
        dropzone.removeEventListener('drop', onDrop)
        input.removeEventListener('change', onChange)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [])

  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const onSubmit = async e => {
      e.preventDefault()
      const btn = document.getElementById('submit-btn')
      const text = document.getElementById('submit-text')
      const spinner = document.getElementById('submit-spinner')
      btn.disabled = true
      text.textContent = t('upload.submitting')
      spinner.classList.remove('hidden')

      const formData = new FormData(e.target)

      try {
        const res = await fetch('/api/products', { method: 'POST', body: formData })
        const data = await res.json()

        if (res.ok) {
          showToast(t('upload.success'))
          setTimeout(() => { window.location.href = `/product.php?id=${data.id}`; }, 1000)
        } else {
          showToast((data.error || t('upload.error_upload')), 'danger')
          btn.disabled = false
          text.textContent = t('upload.submit')
          spinner.classList.add('hidden')
        }
      } catch (err) {
        showToast(t('upload.error_network'), 'danger')
        btn.disabled = false
        text.textContent = t('upload.submit')
        spinner.classList.add('hidden')
      }
    }

    form.addEventListener('submit', onSubmit)
    return () => form.removeEventListener('submit', onSubmit)
  }, [])

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 nav-blur border-b border-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <img src="/mars_128x.png" alt="KeymapHub" className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-violet-500/20" />
              <span className="text-lg font-bold text-white tracking-tight">KeymapHub</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
                <i className="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
              </Link>
              <Link href="/docs" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => window.setLang('vi')} className="lang-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium bg-violet-500/20 text-white hover:bg-violet-500/30 transition-all" data-lang="vi">
                <span>🇻🇳</span>
              </button>
              <button onClick={() => window.setLang('en')} className="lang-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-800/50 transition-all" data-lang="en">
                <span>🇺🇸</span>
              </button>

              <button onClick={toggleMobile} className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-list text-xl" id="menu-icon"></i>
              </button>
            </div>
          </div>

          <div id="mobile-nav" className="mobile-nav md:hidden">
            <div className="py-3 space-y-1 border-t border-gray-800/50">
              <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
                <i className="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
              </Link>
              <Link href="/docs" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 mb-4">
              <i className="ph-duotone ph-upload text-xl sm:text-2xl text-violet-400"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white" data-i18n="upload.title">Share Keymap</h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base" data-i18n="upload.desc">Upload your custom Martian Launcher keymap layout and share it with the community.</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-800/50 flex items-center gap-2.5">
              <i className="ph-duotone ph-database text-violet-400"></i>
              <span className="font-semibold text-white text-sm sm:text-base" data-i18n="upload.section_title">Keymap Information</span>
            </div>

            <div className="p-4 sm:p-6">
              <form ref={formRef} id="upload-form" encType="multipart/form-data">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      <span data-i18n="upload.name">Name</span> <span className="text-red-400">*</span>
                    </label>
                    <input type="text" name="name" required data-i18n-placeholder="upload.name_placeholder" placeholder="e.g. Two Finger Tap Controls" className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5" data-i18n="upload.version">Version</label>
                      <input type="text" name="version" defaultValue="1.0.0" className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5" data-i18n="upload.author">Author</label>
                      <input type="text" name="author" data-i18n-placeholder="upload.author_placeholder" placeholder="Your name" className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      <span data-i18n="upload.desc_label">Description</span>
                    </label>
                    <textarea name="description" rows="3" data-i18n-placeholder="upload.desc_placeholder" placeholder="Describe your keymap layout, what games it works with..." className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all resize-none"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      <span data-i18n="upload.json_paste">JSON Data (paste directly)</span>
                    </label>
                    <textarea name="json_data" rows="5" data-i18n-placeholder="upload.json_placeholder" placeholder='[{"id": 1, "name": "Example"}]' className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all font-mono resize-none"></textarea>
                  </div>

                  <div className="border-t border-gray-800/50 pt-5">
                    <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                      <i className="ph-duotone ph-folder-open text-violet-400"></i>
                      <span data-i18n="upload.or_files">Or Upload Files</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" data-i18n="upload.json_file">JSON File</label>
                        <div className="drop-zone px-6 py-8 sm:px-10 sm:py-10" id="json-dropzone">
                          <i className="ph-duotone ph-file-js text-3xl sm:text-4xl text-violet-400 mb-3 block"></i>
                          <div className="font-medium text-gray-300 mb-1 text-sm sm:text-base" data-i18n="upload.json_drop">Drop .json file here</div>
                          <div className="text-xs text-gray-600">or click to browse</div>
                          <input type="file" name="json_file" accept=".json" className="hidden" />
                        </div>
                        <div id="json-file-info" className="mt-2 text-xs text-emerald-400 hidden"></div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" data-i18n="upload.image">Preview Image</label>
                        <div className="drop-zone px-6 py-8 sm:px-10 sm:py-10" id="image-dropzone">
                          <i className="ph-duotone ph-image text-3xl sm:text-4xl text-violet-400 mb-3 block"></i>
                          <div className="font-medium text-gray-300 mb-1 text-sm sm:text-base" data-i18n="upload.image_drop">Drop image here</div>
                          <div className="text-xs text-gray-600" data-i18n="upload.image_hint">PNG, JPG, WebP</div>
                          <input type="file" name="image" accept="image/*" className="hidden" />
                        </div>
                        <div id="image-file-info" className="mt-2 text-xs text-emerald-400 hidden"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-8 pt-5 border-t border-gray-800/50">
                  <Link href="/" className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all" data-i18n="upload.cancel">Cancel</Link>
                  <button type="submit" id="submit-btn" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-400 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    <span id="submit-text" data-i18n="upload.submit">Upload Keymap</span>
                    <span id="submit-spinner" className="hidden"><i className="ph-duotone ph-circle-notch text-base animate-spin"></i></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm" data-i18n="footer.text">KeymapHub — Community Keymap Sharing for Martian Launcher</p>
        </div>
      </footer>
    </>
  )
}
