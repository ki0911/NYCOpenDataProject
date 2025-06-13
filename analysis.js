let data;
let nep = 0, mal = 0, aoc = 0, cere = 0, heart = 0, flu = 0, alz = 0, hypertension = 0, mental = 0, perinatal = 0, liver = 0, respiratory = 0, diabetes = 0, accidents = 0, congenital = 0;

async function init() {
  let link = "https://data.cityofnewyork.us/resource/jb7j-dtam.json";
  let info = await fetch(link);
  data = await info.json();
  console.log(data);

  processData();
  let chartType = document.getElementById("chartType").value;
  displayChart(generateChartData(), "mainChart", chartType);
}

function processData() {
  nep = 0;
  mal = 0;
  aoc = 0;
  cere = 0;
  heart = 0;
  flu = 0;
  alz = 0;
  hypertension = 0;
  mental = 0;
  perinatal = 0;
  liver = 0;
  respiratory = 0;
  diabetes = 0;
  accidents = 0;
  congenital = 0;

  for (let i = 0; i < data.length; i++) {
    let cause = data[i];
    if (cause.leading_cause === "Nephritis, Nephrotic Syndrome and Nephrisis (N00-N07, N17-N19, N25-N27)") {
      nep++;
    } else if (cause.leading_cause === "Malignant Neoplasms (Cancer: C00-C97)") {
      mal++;
    } else if (cause.leading_cause === "All Other Causes") {
      aoc++;
    } else if (cause.leading_cause === "Cerebrovascular Disease (Stroke: I60-I69)'ATTAN") {
      cere++;
    } else if (cause.leading_cause === "Diseases of Heart (I00-I09, I11, I13, I20-I51)") {
      heart++;
    } else if (cause.leading_cause === "Influenza (Flu) and Pneumonia (J09-J18)") {
      flu++;
    } else if (cause.leading_cause === "Alzheimer's Disease (G30)") {
      alz++;
    } else if (cause.leading_cause === "Essential Hypertension and Renal Diseases (I10, I12)") {
      hypertension++;
    } else if (cause.leading_cause === "Mental and Behavioral Disorders due to Accidental Poisoning and Other Psychoactive Substance Use (F11-F16, F18-F19, X40-X42, X44)") {
      mental++;
    } else if (cause.leading_cause === "Certain Conditions originating in the Perinatal Period (P00-P96)") {
      perinatal++;
    } else if (cause.leading_cause === "Chronic Liver Disease and Cirrhosis (K70, K73)") {
      liver++;
    } else if (cause.leading_cause === "Chronic Lower Respiratory Diseases (J40-J47)") {
      respiratory++;
    } else if (cause.leading_cause === "Diabetes Mellitus (E10-E14)") {
      diabetes++;
    } else if (cause.leading_cause === "Accidents Except Drug Poisoning (V01-X39, X43, X45-X59, Y85-Y86)") {
      accidents++;
    } else if (cause.leading_cause === "Congenital Malformations, Deformations, and Chromosomal Abnormalities (Q00-Q99)") {
      congenital++;
    }
  }
}

function generateChartData() {
  return [
    ['Nephritis, Nephrotic Syndrome and Nephrisis (N00-N07, N17-N19, N25-N27)', nep],
    ['Malignant Neoplasms (Cancer: C00-C97)', mal],
    ['All Other Causes', aoc],
    ['Cerebrovascular Disease (Stroke: I60-I69)', cere],
    ['Diseases of Heart (I00-I09, I11, I13, I20-I51)', heart],
    ['Influenza (Flu) and Pneumonia (J09-J18)', flu],
    ["Alzheimer's Disease (G30)", alz],
    ['Essential Hypertension and Renal Diseases (I10, I12)', hypertension],
    ['Mental and Behavioral Disorders due to Accidental Poisoning and Other Psychoactive Substance Use (F11-F16, F18-F19, X40-X42, X44)', mental],
    ['Certain Conditions originating in the Perinatal Period (P00-P96)', perinatal],
    ['Chronic Liver Disease and Cirrhosis (K70, K73)', liver],
    ['Chronic Lower Respiratory Diseases (J40-J47)', respiratory],
    ['Diabetes Mellitus (E10-E14)', diabetes],
    ['Accidents Except Drug Poisoning (V01-X39, X43, X45-X59, Y85-Y86)', accidents],
    ['Congenital Malformations, Deformations, and Chromosomal Abnormalities (Q00-Q99)', congenital]
  ];
}

function displayChart(chartData, containerId, chartType) {
  let chartContainer = document.getElementById(containerId);
  chartContainer.innerHTML = ''; 

  if (chartType === 'bar') {
    c3.generate({
      bindto: `#${containerId}`,
      data: {
        columns: chartData,
        type: 'bar'
      }
    });
  } else if (chartType === 'pie') {
    c3.generate({
      bindto: `#${containerId}`,
      data: {
        columns: chartData,
        type: 'pie'
      }
    });
  }
}

document.getElementById('yearFilter').addEventListener('change', function() {
  processData();
  let chartType = document.getElementById('chartType').value;
  displayChart(generateChartData(), "mainChart", chartType);
});

document.getElementById('chartType').addEventListener('change', function() {
  let chartType = this.value;
  displayChart(generateChartData(), "mainChart", chartType);
});

init();
