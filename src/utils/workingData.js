const workingData = (data, nameData) => {
  let returnArray = [];
  if (nameData === "educExpe") {
    let education = [];
    let experience = [];
    data.map((item) => {
      if (item.educExpe === "education") {
        education.push(item)
      } else if (item.educExpe === "experience") {
        experience.push(item);
      }
      return item;
    });
    returnArray = [education, experience];
  }
  if(nameData === "skill"){
    let codingSkill = [];
    let generalSkill = [];
    let language = [];
    data.map((item) => {
      if (item.skillCategory === "codingSkill") {
        codingSkill.push(item)
      } else if (item.skillCategory === "generalSkill") {
        generalSkill.push(item);
      }else if (item.skillCategory === "language") {
        language.push(item);
      }
      return item;
    });
    returnArray = [codingSkill, generalSkill, language];
  }
  return returnArray;
}

export default workingData;