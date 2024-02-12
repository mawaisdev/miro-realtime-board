import { Sidebar } from '@/app/(dashboard)/_component/sidebar'
import { OrganizationalSidebar } from '@/app/(dashboard)/_component/org-sidebar'
import { Navbar } from '@/app/(dashboard)/_component/navbar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const layout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className='h-full'>
      <Sidebar />
      <div className='pl-[60px] h-full'>
        <div className='flex gap-x-3 h-full'>
          <OrganizationalSidebar />
          <div className='h-full flex-1'>
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default layout
