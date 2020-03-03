exports.getData = async function(page) {
  
  const days = 7;
  const daysData = [];
  let errorHappened = false;
  for(let dayID = 0;dayID<days;dayID++) {
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
    daysData[dayID] = dayData;
  }
  const props = {page, daysData}
  await getDay(props);
  for(let row = 0; row<daysData.length;row++) {
    const props = {page, daysData, row};
    try {
      await getImage(props);
      await getAll(props);
    } catch (error) {
      console.log(error);
      errorHappened = true;
    }
  }
  if(errorHappened) {
    return null;
  }
  return (daysData);
}

const getDay = async ({page, daysData}) => {
  const elements = await page.$x(`//*[contains(@class, "seven-day-forecast")]//thead/tr[1]`);
  const raw = await elements[0].getProperty('innerText');
  const value = await raw.jsonValue();
  const values = value.split("\t");
  for(let i = 0; i<daysData.length;i++) {
    daysData[i].day = values[i+1];
  }
}
const getImage = async ({page, daysData, row}) => {
  const elements = await page.$x(`//*[contains(@class, "seven-day-forecast")]//tbody/tr[1]//img`);
  const raw = await elements[row].getProperty('src');
  const value = await raw.jsonValue();
    daysData[row].image = value;
}

const getAll = async ({page, daysData, row}) => {
  const elements = await page.$x(`//*[contains(@class, "seven-day-forecast")]//tbody/tr[${row+1}]`);
  const raw = await elements[0].getProperty('innerText');
  const value = await raw.jsonValue();
  const values = value.split("\t");
  for(let i = 0; i<daysData.length;i++) {
    switch (row) {
      case 1: // minTemp
        daysData[i].minTemp = values[i+1];
        break;
      case 2: // maxTemp
        daysData[i].maxTemp = values[i+1];
        break;
      case 3: // Rain
        const values2 = values[i+1].split("\n")
        daysData[i].rainChance = values2[1];
        daysData[i].rainAmount = values2[2];
        break;
      case 4: // UVIndex
        daysData[i].UVIndex = values[i+1];
        break;
    }
    
  }
  
}
