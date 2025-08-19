import DigitalGardenGrid from '../components/digital-garden-grid'

export const metadata = {
    icons: {
        icon: '/icons/garden.svg'
    }
}

export default function Page() {
    return (
        <section>
            <DigitalGardenGrid />
        </section>
    )
}