import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Index')
  // Redirect to login page by default.
  // Authentication checks in layout/pages will handle redirection
  // to dashboard if already logged in.
  // redirect('/login')
  const currentLocale = t('locale')

  if (currentLocale === 'en') {
    return <p>Welcome to FaceChecker, this is English version</p>
  }

  if (currentLocale === 'vi') {
    return <p>Chào mừng đến với FaceChecker, đây là phiên bản Tiếng Việt</p>
  }

  return <p>Loading...</p>
}
