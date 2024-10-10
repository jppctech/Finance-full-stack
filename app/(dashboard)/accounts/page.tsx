"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { useBulkAccounts } from "@/features/accounts/api/bulk-delete"
import { useGetAccounts } from "@/features/accounts/api/accounts"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"

const AccountsPage = () => {
    const newAccount = useNewAccount();
    const deleteAccounts = useBulkAccounts();
    const accountQuery = useGetAccounts();
    const accounts = accountQuery.data || []

    const isDisabled = accountQuery.isLoading || deleteAccounts.isPending

    if (accountQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:items-center lg:justify-between lg:flex-row">
                    <CardTitle className="text-xl line-clamp-1">
                        Account pages
                    </CardTitle>
                    <Button size={"sm"} onClick={newAccount.onOpen}>
                        <Plus className="size-4 mr-2"/>
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        columns={columns} 
                        data={accounts}
                        filterKey="name" 
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteAccounts.mutate({ ids })
                        }}   
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage