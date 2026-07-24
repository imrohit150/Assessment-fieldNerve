import Cards from './components/cards'
import Chart from './components/charts'

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="flex flex-col gap-8">
                <Cards />
                <hr/>
                <Chart />
            </div>
        </div>
    )
}

export default Dashboard