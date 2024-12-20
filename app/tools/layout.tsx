import { ToolsSidebar } from '@/components/tools-sidebar'

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <ToolsSidebar />
            <div className="flex-1 p-8">{children}</div>
        </div>
    )
}

