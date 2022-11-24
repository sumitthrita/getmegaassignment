import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

const GraphOne = props => {
    const [graphData, setGraphData] = useState([])
    const [loader, setLoader] = useState(true)
    const [pieChartColors, setPieChartColors] = useState(["#fff", "#66ff99", "#ccff66", "#cc6600", "#cc9900", "#999966", "#669900", "#00cc00", "#00cc99", "#33cccc", "#33ccff", "#ccccff", "#ff99ff", "#ffff99", "#66ff99", "#9933ff", "#ff9999"])
    const [hoverData, setHoverData] = useState({})
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

    const RADIAN = Math.PI / 180;

    // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //     return (
    //         <text x={x} y={y} fill="white" textAnchor='middle' dominantBaseline="central" fontSize={11}>
    //         {/* {`${(percent * 100).toFixed(0)}%`} */}
    //             {graphData && graphData[index]["value"] > 0 && graphData[index]["name"]}
    //         </text>
    //     );
    // }   

    useEffect(() => {
        if(props.finalData && props.finalData.length > 0){
            let data = []
            let hoverObj = {}
            props.finalData.forEach(edata => {
                let total = 0;
                let monthData = []

                months.forEach(e => {
                    total = total + edata[e];
                    monthData.push(edata[e])
                })

                hoverObj = {
                    ...hoverObj,
                    [edata.company] : { 
                       value : monthData,
                       country : edata["country"]
                    }
                }

                let obj = {
                    name : edata.company,
                    value : total
                }

                data.push(obj)
            })

            setGraphData(data)
            setHoverData(hoverObj)
        }
    },[])

    useEffect(() => {
        if(graphData && graphData.length > 0){
            setLoader(false)
        }
    },[graphData])

    const CustomTooltip = ({ active, payload, label }) => {
        if(active && payload[0]?.payload?.name !== "" && hoverData[payload[0].payload.name]){
            return (
                <div className="custom-tooltip a-p-f-r">
                    <h4>{payload[0].payload.name} ({hoverData[payload[0].payload.name].country}) </h4>
                    {hoverData[payload[0].payload.name].value.map((item, i) => {
                        return (
                            <p className='desc' >
                                <span className='desc_title'>
                                    {months[i].toUpperCase()}:
                                </span>
                                <span className='desc_content'>
                                    {" " + item}
                                </span>
                            </p>
                        )
                    })}
                </div>
            )
        }
        return null;
    }

    return (
        <div className='graph_one' >
            <div className='title'>Company wise Yearly Revenue</div>
            <div className='graph_container' >
                <ResponsiveContainer width="100%" height={200} >
                    {loader? 
                        <div>Loading...</div>
                    :
                    graphData.length===0? 
                        <h1 className='no-data-error-msg'>NO DATA AVAILABLE</h1>
                    :
                        <PieChart>
                            <Pie dataKey="value" data={graphData? graphData : null} fill="#8884d8" labelLine={false} outerRadius={80} > 
                            {graphData && graphData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieChartColors&& pieChartColors[index % pieChartColors.length]} />
                            ))}
                            
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    }
                </ResponsiveContainer>
            </div>
        </div>
    )

}


export default GraphOne;

