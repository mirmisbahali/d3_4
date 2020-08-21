const {select, 
    csv, 
    scaleLinear, 
    extent, 
    axisLeft, 
    axisBottom, 
    format

} = d3


const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

// d.mpg = +d.mpg;
// d.cylinders = +d.cylinders;
// d.displacement = +d.displacement;
// d.horspower = +d.horspower;
// d.weight = +d.weight;
// d.acceleration = +d.acceleration;
// d.year = +d.year;

const render = data => {
    const xValue = d => d.weight;
    const yValue = d => d.horsepower;
    const margin = {top: 50, right: 40, bottom: 70, left: 200}
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
                    .domain(extent(data, xValue))
                    .range([0, innerWidth])
                    .nice();
    
    const yScale = scaleLinear()
                    .domain(extent(data, yValue))
                    .range([0, innerHeight]);


    const g = svg.append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

    
    const xAxisTickFormat = number => format('.3s')(number).replace('G', "B")

    const xAxis = axisBottom(xScale)
                .tickFormat(xAxisTickFormat)
                .tickSize(-innerHeight);

    const yAxis = axisLeft(yScale).tickSize(-innerWidth)
    g.append('g')
    .call(yAxis)
    .selectAll('.domain')
    .remove();


    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)
        
    xAxisG.select('.domain')
        .remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-lable')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text('Population')

    g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', 18);

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text('Top 10 Most Popular Countries');
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
});
