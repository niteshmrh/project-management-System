function isValid(person) {
  const name = person.Name;
  const mobile = person.Name;
  const pan = person.Name;
  const email = person.Name;
  const aadhar = person.Name;

  const checkName = /^[A-Za-z\s]+$/;
  const checkMobile = /^[+]{1}[9]{1}[1]{1}[9876][0-9]{9}$/;
  const cheakPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const checkEmail =
    /^([A-Za-z0-9]+[._]*)+@[gG][mM][Aa][Ii][Ll][.]{1}[Cc]{1}[Oo]{1}[Mm]{1}$/;
  const checkAadhar = /^[0-9]{12}$/;

  if (checkName.test(name)) {
    return "";
  } else {
    return false;
  }
}
