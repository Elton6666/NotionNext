/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/**
 * 站点图标
 * @returns
 */
export const Logo = props => {
  const { white, NOTION_CONFIG } = props
  const router = useRouter()
  const logoWhite = siteConfig('STARTER_LOGO_WHITE')
  const logoNormal = siteConfig('STARTER_LOGO')
  const { isDarkMode } = useGlobal()
  const [logo, setLogo] = useState(router.route === '/' ? logoWhite : logoNormal)
  const [logoTextColor, setLogoTextColor] = useState(router.route === '/' ? 'text-white' : 'text-black')

  useEffect(() => {
    // 滚动监听
    const throttleMs = 200
    const navBarScrollListener = throttle(() => {
      const scrollY = window.scrollY
      const homePageNavBar = router.route === '/' && scrollY < 10

      if (white || isDarkMode || homePageNavBar) {
        setLogo(logoWhite)
        setLogoTextColor('text-white')
      } else {
        setLogo(logoNormal)
        setLogoTextColor('text-black')
      }
    }, throttleMs)

    // 立即执行一次以设置初始状态
    navBarScrollListener()
    window.addEventListener('scroll', navBarScrollListener)
    return () => {
      window.removeEventListener('scroll', navBarScrollListener)
    }
  }, [isDarkMode, router, white, logoWhite, logoNormal])

  return (
    <div className='w-60 max-w-full px-4'>
      <div className='navbar-logo flex items-center w-full py-5 cursor-pointer'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logo && (
          <LazyImage
            priority
            onClick={() => {
              router.push('/')
            }}
            src={logo}
            alt='logo'
            className='header-logo mr-1 h-10'//修改logo大小
          />
        )}
        {/* logo文字 */}
        <span
          onClick={() => {
            router.push('/')
          }}
          className={`${logoTextColor} logo dark:text-white py-1.5 header-logo-text whitespace-nowrap text-2xl font-semibold`}>
          {siteConfig('TITLE')}
        </span>
      </div>
    </div>
  )
}
