import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { AllOrders } from './AllOrders';
import { YourOrders } from './YourOrders';

export const DashboardTabs = () => {
    const [tabOpen, setTabOpen] = useState<boolean>(true);

    return (
        <div className='bg-background w-5/6 rounded-lg border border-highlight mx-auto my-8 h-[80%] min-h-[575px]'>
            <Tabs.Root className="flex flex-col py-4 h-full" defaultValue="allOrders" onValueChange={() => setTabOpen(previousTab => !previousTab)}>
                <Tabs.List className="flex text-xl font-semibold">
                    <Tabs.Trigger className={`px-4 ml-4 border-b-2 ${tabOpen ? 'text-highlight border-highlight' : 'text-secondary border-background hover:cursor-pointer hover:text-main duration-150'}`} value="allOrders">
                        Todos os pedidos
                    </Tabs.Trigger>
                    <Tabs.Trigger className={`px-4 border-b-2 ${!tabOpen ? 'text-highlight border-highlight' : 'text-secondary border-background hover:cursor-pointer hover:text-main duration-150'} mobile:text-base`} value="yourOrders">
                        Seus pedidos
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className='h-full' value="allOrders">
                    <AllOrders />
                </Tabs.Content>
                <Tabs.Content className='h-full' value="yourOrders">
                    <YourOrders />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}