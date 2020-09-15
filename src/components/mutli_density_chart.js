import * as d3 from 'd3'


export function MultiDensityChart(csvPath, element) {

    const elementObj = document.querySelector(element)
    const baseWidth = Math.max(600, elementObj.offsetWidth)
    const baseHeigth = Math.max(400, elementObj.offsetHeight)

    console.log(elementObj)
    var margin = { top: 30, right: 10, bottom: 30, left: 100 },
        width = baseWidth - margin.left - margin.right,
        height = baseHeigth - margin.top - margin.bottom
    
    // Percent two area charts can overlap
    var overlap = 0.6
    
    var formatTime = d3.timeFormat('%m %Y')
    
    var svg = d3.select(element).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    
    var x = function(d) { return d.time },
        xScale = d3.scaleTime().range([0, width]),
        xValue = function(d) { return xScale(x(d)) },
        xAxis = d3.axisBottom(xScale).tickFormat(formatTime)
    
    var y = function(d) { return d.value },
        yScale = d3.scaleLinear(),
        yValue = function(d) { return yScale(y(d) / 15) }
    
    var activity = function(d) { return d[0] },
        activityScale = d3.scaleBand().range([0, height]),
        activityValue = function(d) { return activityScale(activity(d)) },
        activityAxis = d3.axisLeft(activityScale)
    
    var area = d3.area()
        .x(xValue)
        .y1(yValue)
    
    var line = area.lineY1()
    
    function parseTime(offset) {
        var date = new Date(1970, 0, 1)
        return d3.timeDay.floor(d3.timeSecond.offset(date, offset))
    }
    
    function row(d) {
        var content = {
            activity: d.type,
            time: parseTime(parseInt(d.time)),
            value: d.total
        }
      return content
    }


    d3.csv(csvPath, row).then(function(dataFlat) {
        dataFlat = dataFlat.filter(function(row) {
          return row.activity === 'js' || 
                 row.activity === 'vue' || 
                 row.activity === 'html' || 
                 row.activity === 'css' || 
                 row.activity === 'py' ||
                 row.activity === 'tex' ||
                 row.activity === 'md'
        })
    
        // Sort by time
        dataFlat.sort(function(a, b) { return a.time - b.time })

        var data = d3.groups(dataFlat, d => d.activity)
        console.log(data)
        
        xScale.domain(d3.extent(dataFlat, x))
    
        activityScale.domain(data.map(function(d) { return d[0] }))
    
        var areaChartHeight = (1 + overlap) * (height / activityScale.domain().length)
        console.log('aCH', areaChartHeight)
    
        yScale
            .domain(d3.extent(dataFlat, y))
            .range([areaChartHeight, 0])
        
        area.y0(yScale(0))
    
        svg.append('g').attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)
    
        svg.append('g').attr('class', 'axis axis--activity')
            .call(activityAxis)
    
        var gActivity = svg.append('g').attr('class', 'activities')
                .selectAll('.activity').data(data)
            .enter().append('g')
                .attr('class', function(d) { return 'activity activity--' + d[0] })
                .attr('transform', function(d) {
                    var ty = activityValue(d) - activityScale.bandwidth() - 53.36 / 2
                    return 'translate(0,' + ty + ')'
                })
    
        gActivity.append('path').attr('class', 'area')
            .datum(function(d) { return d[1] })
            .attr('d', area)
        
        gActivity.append('path').attr('class', 'line')
            .datum(function(d) { return d[1] })
            .attr('d', line)
    })
}
