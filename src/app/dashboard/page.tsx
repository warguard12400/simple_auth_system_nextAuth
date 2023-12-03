import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// export default async function DashboardPage() {
//   const session = await getServerSession()
//   if (!session) {
//     redirect('/login')
//   }

//   return <div>DashboardPage</div>
// }

const DashboardPage = async () => {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }
  return (
    <div className='w-full h-screen flex items-center justify-center text-white font-bold'>
      DashboardPage
    </div>
  )
}

export default DashboardPage
