exports.getData = async function(page) {
  const daysData = [];
  const days = 7;
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
    const props = {page, dayData, dayID};
    await getAll(props);
    await getImage(props);
    daysData[dayID] = dayData;
  }

  return (daysData);
}

const getAll = async ({page, dayData, dayID}) => {
  const elements = await page.$x(`//*[contains(@class, "day")]`);
  const raw = await elements[dayID].getProperty('innerText');
  const value = await raw.jsonValue();
  const values = await value.split('\n');
  values.forEach(element => {
    if(element.includes('day')) {
      const dayArray = element.split(" ");
      dayArray.forEach(element => {
        if(element.includes("Monday")||element.includes("Tuesday")||
        element.includes("Wednesday")||element.includes("Thursday")||
        element.includes("Friday")||element.includes("Saturday")||
        element.includes("Sunday")) {
          dayData.day = element;
        }
      });
    } else if (element.includes("Min")) {
      const [,value] = element.split(' ');
      dayData.minTemp = value;
    } else if (element.includes("Max")) {
      const [,value] = element.split(' ');
      dayData.maxTemp = value;
    } else if (element.includes("rainfall")) {
      const values = element.split(" ");
      let string = "";
      for(let i = 2;i<values.length;i++) {
        string += values[i]+" ";
      }
      dayData.rainAmount = string;
    } else if (element.includes("rain")) {
      const values = element.split(" ");
      dayData.rainChance = values[4];
    } else if (element.includes("Fire Danger")) {
      const values = element.split(" ");
      let string = "";
      for(let i = 3;i<values.length;i++) {
        string += values[i];
      }
      dayData.fireDanger = string;
    } else if (element.includes("UV Index")) {
      const values = element.split("[");
      const value = values[values.length-1].slice(0, -1);
      dayData.UVIndex = value;
    }
  });
}

const getImage = async ({page, dayData, dayID}) => {
  try {
    console.log('this is dayID '+dayID+" this is dayData "+dayData.day);
    const elements = await page.$x(`//*[contains(@class, "day")]//dd[@class="image"]/img`);
    const raw = await elements[dayID].getProperty('src');
    console.log('this is the raw '+raw);
    const src = await raw.jsonValue();
    console.log('this is the src '+src);
    dayData.image = src;
  } catch (error) {
    console.log(error);
  }
}
