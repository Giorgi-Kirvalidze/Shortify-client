import React from 'react';
import { useSelector } from 'react-redux';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer,
} from 'recharts';


const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const radius = 10;
    return (
        <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
            <text x={x + width / 2} y={y - radius} fill="azure" textAnchor="middle" dominantBaseline="middle">
                {value.split(' ')[1]}
                {console.log(value)}
            </text>
        </g>
    );
};


const Chart = () => {
    const urlData = useSelector(state => state.url.urlData)
    const totalClicks = urlData.clicks
    const uniqueClicks = urlData.uniqueClick
    const data = [
        {
            name: 'Clicks',
            Unique: uniqueClicks,
            Total: totalClicks,
        },
    ];
    return (
        <>
            <div style={{ transform: `translateY(-80px)` }}>
                <h1 style={{ color: '#ffffff', textAlign: 'center' }}>General link data</h1>
            </div>
            <ResponsiveContainer width="100%" height="50%">
                <BarChart
                    data={data}
                    height={400}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip cursor={{ stroke: '#0096FF', strokeWidth: 2 }} wrapperStyle={{ color: 'black' }} />
                    <Legend />
                    <Bar dataKey="Total" fill="#8884d8" minPointSize={5}>
                        <LabelList dataKey="name" content={renderCustomizedLabel} />
                    </Bar>
                    <Bar dataKey="Unique" fill="#82ca9d" minPointSize={10} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

export default Chart