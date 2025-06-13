// 异步获取数据
async function init() {
  let link = "https://data.cityofnewyork.us/resource/jb7j-dtam.json";
  let info = await fetch(link);
  let data = await info.json(); // 获取到数据后解析

  // 确保数据加载后再显示卡片
  card(data);
}

function card(data) {
  let year = document.getElementById("yearFilter");  
  let cause = document.getElementById("causeFilter");  
  let output = document.getElementById("dataContainer");  
  let build = "";

  for (let i = 0; i < data.length; i++) {
    let infocard = data[i];

    if ((year.value === "all" || infocard.year === year.value) && 
        (cause.value === "all" || infocard.leading_cause === cause.value)) {
      build += `<div class="card">`;
      build += `<h3>${infocard.leading_cause}</h3>`;
      build += `<h4>Year:${infocard.year}</h4>`;
      build += `<h4>Gender:${infocard.sex}</h4>`;
      build += `<h4>Race:${infocard.race_ethnicity}</h4>`;
      build += `<h4>Deaths:${infocard.deaths}</h4>`;
      build += `</div>`;
    }
  }

  if (build === "") {
    build = `<p>No data found for the selected filters.</p>`;
  }

  output.innerHTML = build;
}


window.onload = init;


document.getElementById("yearFilter").addEventListener("change", () => init());
document.getElementById("causeFilter").addEventListener("change", () => init());
