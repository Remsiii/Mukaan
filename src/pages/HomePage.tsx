import { useFilter } from '../context/FilterContext';
import { callouts } from '../data/callouts';

export default function HomePage() {
    const { activeFilter } = useFilter();

    const filteredCallouts = activeFilter === 'all'
        ? callouts
        : callouts.filter(callout => callout.category === activeFilter);

    return (
        <div>
            <FluidTabs />
            {/* Render filteredCallouts hier */}
        </div>
    );
}
