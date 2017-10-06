export default function getNutrientDeficientChart(deficits) {

     const avgDailyConsumption = []
     const dailyRecommendations = []

     console.log('deficits', deficits)

     // for every item in deficits, add to the consumption and rec arrays
     for (let nutrient in deficits) {
      console.log('nutrient', nutrient)
        avgDailyConsumption.push(deficits[nutrient][0])
        dailyRecommendations.push(deficits[nutrient][1])
     }

     avgDailyConsumption.unshift('Avg Daily Consumption')
     dailyRecommendations.unshift('Recommended Daily Values')

     console.log(avgDailyConsumption, 'avg daily consump')
     console.log(dailyRecommendations, 'daily rec')
     const chartObj = {
      data: {
        columns: [
           avgDailyConsumption,
           dailyRecommendations
        ],
        type: 'bar'
      },
      bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
    }
    }

   return chartObj


  }