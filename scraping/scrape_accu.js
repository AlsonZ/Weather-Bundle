exports.getData = async function(page, url) {
  page.setUserAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36");
  const daysData = [];
  const days = 7;
  for(let dayID = 0;dayID<days;dayID++) {
    const day = dayID+1;
    // await page.goto(url+"?day="+day);
    await page.goto(`${url}?day=${day}`);
    let dayData = {
      day: "-",
      image: "-",
      minTemp: "-",
      maxTemp: "-",
      rainChance: "-",
      rainAmount: "-",
      fireDanger: "-",
      UVIndex: "-"
    }
    const props = {page, dayData};
    await getImage(props);
    await getDay(props);
    daysData[dayID] = dayData;
  }
  return (daysData);
}

const getDay = async ({page, dayData}) => {
  const elements = await page.$x(`//*[contains(@class, "panel-wrap")]`);
  const raw = await elements[0].getProperty('innerText');
  const value = await raw.jsonValue();
  const values = await value.split('\n');
  let setMaxTemp = false;
  let setRainChance = false;
  let setRainAmount = false;
  values.forEach((element, i) => {
    if(i == 3) {
      dayData.day = element;
    } else if(!setMaxTemp && element.includes('Hi')) {
      const temp = element.split('°');
      dayData.maxTemp = temp[0];
      setMaxTemp = true;
    } else if(element.includes('UV')) {
      const temp = element.split(' ');
      dayData.UVIndex = temp[temp.length-1];
    } else if(!setRainChance && element.includes('Probability of Precipitation')) {
      const temp = element.split(' ');
      dayData.rainChance = temp[temp.length-1];
      setRainChance = true;
    } else if(!setRainAmount && element.includes('Rain')) {
      const temp = element.split(' ');
      dayData.rainAmount = temp[1]+temp[2];
      setRainAmount = true;
    } else if(element.includes('Lo')) {
      const temp = element.split('°');
      dayData.minTemp = temp[0];
    }
  })
}

const getImage = async ({page, dayData}) => {
  const elements = await page.$x(`//*[contains(@class, "panel-wrap")]//div[@class="temp-icon-wrapper"]/img`);
  const raw = await elements[0].getProperty('src');
  const src = await raw.jsonValue();
  dayData.image = src;
}