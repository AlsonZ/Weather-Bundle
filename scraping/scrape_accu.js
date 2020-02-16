exports.getData = async function(page, url) {
  // await page.goto(url);
  const daysData = [];
  const days = 7;
  for(let dayID = 0;dayID<days;dayID++) {
    await page.goto(url+"?day="+(dayID+1));
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
    // await getImage(props);
    await getAll(props);
    daysData[dayID] = dayData;
  }
  return (daysData);
}

const getAll = async ({page, dayData}) => {
  const elements = await page.$x(`//*[contains(@class, "content-module")]`);
  const raw = await elements[dayID].getProperty('innerText');
  const value = await raw.jsonValue();
  console.log(value);
  
}