const {
    select,
    csv,
    scaleLinear,
    extent,
    axisBottom,
    axisLeft,

} = d3;

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

render = d => {

    const title = 'Scatter Plot'

    const xValue = d => d.mpg;
    const xAxisLable =  'Weight';
    const yValue = d => d.displacement;
    const yAxisLable = 'Displacement';
    const margin = { top: 50, right: 40, bottom: 70, left: 170 }
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
                    .domain(extent(d, xValue))
                    .range([0, innerWidth])
                    .nice()

    const yScale = scaleLinear()
                    .domain(extent(d, yValue))
                    .range([0, innerHeight])
                    .nice()

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);


    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15)
    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10)

    const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
    
    xAxisG.select('.domain').remove()

    const yAxisG = g.append('g').call(yAxis)
    
    yAxisG.selectAll('.domain').remove()


    xAxisG.append('text')
        .attr('class', 'axis-lable')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLable)

    yAxisG.append('text')
        .attr('class', 'axis-lable')
        .attr('y', -90)
        .attr('x', -innerHeight/2)
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
        .text(yAxisLable)

    g.selectAll('circle')
    .data(d)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cx', d => xScale(xValue(d)))
    .attr('cy', d => yScale(yValue(d)))

    g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text(title)

}



csv('auto-mpg.csv')
    .then(data => {
        data.forEach(d => {
            d.mpg = +d.mpg;
            d.cylinders = +d.cylinders;
            d.displacement = +d.displacement;
            d.horspower = +d.horspower;
            d.weight = +d.weight;
            d.acceleration = +d.acceleration;
            d.year = +d.year;
        });
        render(data)
        // console.log(data)
    })