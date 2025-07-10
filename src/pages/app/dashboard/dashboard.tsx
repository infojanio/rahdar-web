import { Helmet } from 'react-helmet-async'

import { ActiveProductsCard } from './cards/ActiveProductsCard'
import { CashbackGeneratedCard } from './cards/CashbackGeneratedCard'
import { CashbackUsedCard } from './cards/CashbackUsedCard'
import { TotalOrdersCard } from './cards/TotalOrdersCard'
import { TotalStoresCard } from './cards/TotalStoresCard'
import { TotalUsersCard } from './cards/TotalUsersCard'
import { CashbackByMonthChart } from './charts/CashbackByMonthChart'
import { TopProductsTable } from './charts/TopProductsTable'
import { TopUsersTable } from './charts/TopUsersTable'
import { LatestOrdersTable } from './charts/LatestOrdersTable'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        {/* Cards principais */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <TotalOrdersCard />
          <TotalUsersCard />
          <TotalStoresCard />
          <ActiveProductsCard />
          <CashbackGeneratedCard />
          <CashbackUsedCard />
        </div>

        {/* Gráficos e tabelas */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <CashbackByMonthChart />
          <TopUsersTable />
          <TopProductsTable />
          <LatestOrdersTable />
        </div>
      </div>
    </>
  )
}
